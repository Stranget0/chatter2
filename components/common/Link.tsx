import { useAppNavigation } from "../../utils/hooks/navigation";
import Typography, { TypoProps } from "./Typography";

interface Props extends Omit<TypoProps, "type"> {
  to: keyof ParamList;
  type?: TypoProps["type"];
}

const SimpleLink = ({ to, type = "buttonTextSmall", ...other }: Props) => {
  const { navigate } = useAppNavigation();
  return <Typography {...other} type={type} onPress={() => navigate(to)} />;
};

export default SimpleLink;
