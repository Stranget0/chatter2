import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import CustomButton from "../components/common/Button";
import Input from "../components/common/Input";
import InputContainer from "../components/common/InputContainer";
import Main from "../components/common/MainView";
import Typography from "../components/common/Typography";
import {
  authBottomSpace,
  bigSpace,
  blue500,
  centerContent,
  rowDirectionMixin,
  smallSpace,
} from "../styles";
import { handleError } from "../utils/errors";
import { useAppNavigation } from "../utils/hooks/navigation";
import Spanning from "../components/common/Span";
import SimpleLink from "../components/common/Link";

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

interface Response {
  registerUser: ChatUser;
}

const registerQuery = gql`
  mutation RegisterUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      passwordConfirmation: $confirmPassword
    ) {
      email
      firstName
      id
      lastName
      role
    }
  }
`;

const SignUp = () => {
  const { control, handleSubmit, setError } = useForm<FormValues>();
  const { navigate } = useAppNavigation();
  const [registerUser] = useMutation<Response, FormValues>(registerQuery);
  const onSubmit = async (variables: FormValues) => {
    try {
      const { confirmPassword, password } = variables;
      if (password !== confirmPassword)
        throw new Error("Passwords are not the same");
      const { data, errors } = await registerUser({ variables });
      if (errors) throw errors;
      if (data) navigate("LogIn");
    } catch (e) {
      handleError(e, (message) => setError("confirmPassword", { message }));
    }
  };
  return (
    <Main forAuth>
      <Typography type="h1" style={styles.title}>
        Create Account
      </Typography>
      <InputContainer>
        {/* When using control as prop - getting nice intellisense :) */}
        {/* prettier-ignore */}
        <Input control={control} name="email" label="e-mail address" required applyEmailRules />
        {/* prettier-ignore */}
        <Input control={control} name="firstName" label="first name" required />
        {/* prettier-ignore */}
        <Input control={control} name="lastName" label="last name" required />
        {/* prettier-ignore */}
        <Input control={control} name="password" label="password" required secure  applyPasswordRules/>
        {/* prettier-ignore */}
        <Input control={control} name="confirmPassword" label="password confirmation" required secure applyPasswordRules/>

        <View style={centerContent}>
          <CustomButton style={styles.button} onPress={handleSubmit(onSubmit)}>
            Sign up
          </CustomButton>
          <Typography type="bodyText" white>
            By signing up you agree with
          </Typography>
          <Spanning>
            <Typography type="caption2" style={styles.link}>
              Terms and Conditions
            </Typography>
            <Typography type="caption2" white>
              {" "}
              and{" "}
            </Typography>
            <Typography type="caption2" style={styles.link}>
              Privacy Policy
            </Typography>
          </Spanning>
        </View>
        <View style={styles.bottomText}>
          <Typography type="bodyText" white>
            Already have an account?
          </Typography>
          <SimpleLink to="LogIn" spaceLeft>
            Log in
          </SimpleLink>
        </View>
      </InputContainer>
    </Main>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: smallSpace * 3,
  },
  button: {
    marginTop: smallSpace * 2,
    marginBottom: bigSpace,
  },
  link: {
    textDecorationLine: "underline",
    color: blue500,
  },
  bottomText: {
    ...rowDirectionMixin("center"),
    marginTop: authBottomSpace,
  },
});

export default SignUp;
