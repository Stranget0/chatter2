import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import CustomButton from "../components/common/Button";
import Input from "../components/common/Input";
import InputContainer from "../components/common/InputContainer";
import SimpleLink from "../components/common/Link";
import Main from "../components/common/MainView";
import Typography from "../components/common/Typography";
import { userFrag } from "../lib/api";
import {
  authBottomSpace,
  bigSpace,
  centerContent,
  smallSpace,
  whiteColor,
} from "../styles";
import { useUser } from "../utils/contexts/User";
import { handleError, UndefBehaviourError } from "../utils/errors";
import { useAppNavigation } from "../utils/hooks/navigation";

const loginQuery = gql`
mutation login($email:String!, $password:String!){
  loginUser(email:$email,password:$password){
    token
    ${userFrag}
  }
}`;

interface FormValues {
  email: string;
  password: string;
}

type Response = {
  loginUser: {
    token: string;
    user: ChatUser;
  };
};
export const luser = {
  email: "testemail@gmail.com",
  firstName: "Strange",
  id: "0",
  lastName: "Bonk",
  role: "user",
};
const LogIn = () => {
  const { control, setError, handleSubmit } = useForm<FormValues>();
  const { navigate } = useAppNavigation();
  const [, setUser] = useUser();
  const [sendCreds] = useMutation<Response, FormValues>(loginQuery);

  const onSubmit = async (variables: FormValues) => {
    // try {
    // const { data, errors } = await sendCreds({ variables: variables });
    // if (errors) throw errors[0];
    // if (data) {
      // const { user, token } = data.loginUser;
      const usermock: ChatUser = luser;
      setUser({ ...usermock, token: "abc" });
      navigate("Rooms");
      // } else throw new UndefBehaviourError();
      // } catch (e) {
      // handleError(e, (message) => {
      //   if (message === "Invalid credentials") {
      //     setError("password", {
      //       type: "validate",
      //       message: "Wrong email or password",
      //     });
      //   } else setError("password", { message });
      // });
    // }
  };

  return (
    <Main forAuth>
      <Typography type="h1" style={styles.title}>
        Welcome Back
      </Typography>
      <Typography type="h2" style={styles.subtitle}>
        Log in and stay in touch with&nbsp;everyone!
      </Typography>
      <InputContainer>
        <Input
          control={control}
          label="e-mail address"
          name="email"
          required
          applyEmailRules
        />
        <Input
          control={control}
          label="password"
          name="password"
          secure
          required
        />
      </InputContainer>
      <View style={styles.bottomView}>
        <CustomButton onPress={handleSubmit(onSubmit)}>Log in</CustomButton>
        <View style={styles.bottomTextsView}>
          <Typography type="caption2" white>
            Don&apos;t have an account?
          </Typography>
          <SimpleLink to="SignUp" spaceLeft>
            Sign up
          </SimpleLink>
        </View>
      </View>
    </Main>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: smallSpace * 2,
  },
  subtitle: {
    color: whiteColor,
    marginBottom: smallSpace * 3,
  },
  bottomView: {
    ...centerContent,
    width: "100%",
    marginBottom: authBottomSpace,
    position: "absolute",
    bottom: 0,
    left: bigSpace,
  },
  bottomTextsView: {
    ...centerContent,
    flexDirection: "row",
  },
});

export default LogIn;
