import { Animated, ImageSourcePropType, StyleSheet, View } from "react-native";
import {
  blue300,
  smallSpace,
  radius,
  whiteColor,
  rowDirectionMixin,
} from "../../styles";
import { useLoop } from "../../utils/animations";
import ProfileImage from "../common/ProfileImage";

type Props = { isTyping?: boolean; avatar?: ImageSourcePropType };

const Dot = ({ i }: { i: number }) => {
  const initial = ((i % 2) * 2 - 1) * 5;
  const target = -initial;
  const offset = useLoop(initial, target, 0.5);
  return (
    <Animated.View
      key={i}
      style={{ ...styles.dot, transform: [{ translateY: offset }] }}
    />
  );
};

const TypingIndicator = ({ isTyping, avatar }: Props) => {
  if (!isTyping) return null;
  const dots = new Array(3).fill(null).map((_, i) => {
    return <Dot i={i} key={i} />;
  });
  return (
    <View style={styles.container}>
      <ProfileImage source={avatar} style={styles.avatar} />
      <View style={styles.indicator}>{dots}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    ...rowDirectionMixin("space-between"),
    backgroundColor: whiteColor,
    padding: smallSpace,
    width: 67,
    borderRadius: radius,
    borderBottomLeftRadius: 0,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: blue300,
    borderRadius: 100,
  },
  avatar: {
    width: 24,
    height: 24,
    marginRight: smallSpace,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 67,
    marginTop: smallSpace,
    marginBottom: 52,
  },
});
export default TypingIndicator;
