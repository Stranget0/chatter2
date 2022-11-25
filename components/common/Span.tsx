import { FC,ReactNode } from "react";
import { Text } from "react-native";

const Spanning: FC<{children:ReactNode}> = ({ children }) => {
  return <Text>{children}</Text>;
};

export default Spanning;
