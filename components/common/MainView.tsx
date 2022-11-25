import { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { authTopSpace, bigSpace, blue100, blue300 } from "../../styles";

interface Props {
  forAuth?: boolean;
	children:ReactNode
}

const Main: FC<Props> = ({ children, forAuth }) => {
  return <View style={forAuth ? styles.dark : styles.light}>{children}</View>;
};
const styles = StyleSheet.create({
  light: {
    backgroundColor: blue100,
    height: "100%",
  },
  dark: {
    backgroundColor: blue300,
    paddingTop: authTopSpace,
    paddingHorizontal: bigSpace,
    height: "100%",
  },
});

export default Main;
