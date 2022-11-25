import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import {
  Control,
  ControllerProps,
  FieldError,
  FieldValues,
  Path,
  useController,
  UseControllerReturn,
} from "react-hook-form";
import {
  bigSpace,
  errorColor,
  plum500,
  radius,
  typoStyles,
  whiteColor,
} from "../../styles";
import VisionIcon from "../icons/Vision";
import VisionLowIcon from "../icons/VisionLow";
import Typography from "./Typography";
import { handleInputError } from "../../utils/errors";
import { emailRegex } from "../../utils/global";

const passwordRules: ControllerProps["rules"] = {
  minLength: {
    value: 8,
    message: "Password should be at least 8 characters long",
  },
};
const emailRules: ControllerProps["rules"] = {
  pattern: { value: emailRegex, message: "Invalid Email" },
};
interface Props<T extends FieldValues>
  extends Omit<
    TextInputProps,
    "secureTextEntry" | "style" | keyof UseControllerReturn["field"]
  > {
  label: string;
  name: Path<T>;
  control: Control<T>;
  secure?: boolean;
  required?: boolean;
  applyEmailRules?: boolean;
  applyPasswordRules?: boolean;
}

const Input = <T extends FieldValues>({
  label,
  secure,
  name,
  autoFocus,
  control,
  required,
  applyPasswordRules,
  applyEmailRules,
  ...other
}: Props<T>) => {
  const [shouldHide, setShouldHide] = useState(secure);
  const [focused, setFocused] = useState(autoFocus);
  const onPress = () => setShouldHide(!shouldHide);

  let appliedRules = applyPasswordRules ? passwordRules : {};
  if (applyEmailRules) appliedRules = { ...appliedRules, ...emailRules };

  const { field, formState } = useController<T>({
    name,
    control,
    rules: { ...appliedRules, required },
  });
  const errors = formState.errors[name] as FieldError | undefined;
  const { onBlur, onChange } = field;
  let inputStyle = styles.input;
  if (focused) inputStyle = { ...inputStyle, ...styles.focused };
  if (errors) inputStyle = { ...styles.input, ...styles.error };

  return (
    <>
      <Typography type="label" white>
        {label}
      </Typography>
      <View>
        <TextInput
          secureTextEntry={shouldHide}
          style={inputStyle}
          autoFocus={autoFocus}
          onFocus={() => setFocused(true)}
          onChangeText={onChange}
          onBlur={() => {
            setFocused(false);
            onBlur();
          }}
          {...other}
        />
        {secure && (
          <Pressable style={styles.button} onPress={onPress}>
            {shouldHide ? <VisionLowIcon /> : <VisionIcon />}
          </Pressable>
        )}
        {errors && (
          <Typography type="caption2" style={styles.errorText}>
            {handleInputError(errors)}
          </Typography>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    ...typoStyles.titleAndInput,
    backgroundColor: whiteColor,
    borderRadius: radius,
    height: 47,
    paddingHorizontal: bigSpace,
    marginBottom: bigSpace,
  },
  focused: {
    borderColor: plum500,
    borderWidth: 2,
    borderStyle: "solid",
  },
  error: {
    borderColor: errorColor,
    borderWidth: 2,
    borderStyle: "solid",
  },
  button: {
    height: 54.5,
    position: "absolute",
    right: bigSpace,
    top: 15,
    overflow: "hidden",
  },
  errorText: {
    color: errorColor,
    position: "absolute",
    bottom: -4,
    right: 0,
  },
});

export default Input;
