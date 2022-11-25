import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export const useLoop = (
  initial: number,
  target: number,
  duration: number,
  delay?: number
) => {
  const [tar, setTarget] = useState(target);
  const trans = useRef(new Animated.Value(initial)).current;
  const onEnd = ({ finished }: { finished: boolean }) =>
    finished && setTarget(-tar);
  useEffect(() => {
    const anim = Animated.timing(trans, {
      toValue: tar,
      duration: duration * 1000,
      useNativeDriver: true,
    });
    if (delay) Animated.delay(delay).start(() => anim.start(onEnd));
    else anim.start(onEnd);
  }, [tar]);
  return trans;
};
