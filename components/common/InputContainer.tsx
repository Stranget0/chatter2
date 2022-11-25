import { FC, ReactNode } from "react";
import { View } from "react-native";
import { bigSpace } from "../../styles";

const InputContainer: FC<{children:ReactNode}> = ({ children }) => {
  return <View style={style}>{children}</View>;
};
const style = {
  marginHorizontal: bigSpace,
};
export default InputContainer;
