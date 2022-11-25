import { ReactNode } from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { smallSpace, typoStyles, whiteColor } from "../../styles";

type TypoKeys = keyof typeof typoStyles;
interface CustomProps {
  children: ReactNode;
  type: TypoKeys;
  style?: TextStyle;
  white?: boolean;
  spaceLeft?: boolean;
}
export type TypoProps = CustomProps & Omit<TextProps, "style">;

// prettier-ignore
const Typography = ({ type, children, style,white, spaceLeft, ...other }: TypoProps) => {
	let textStyle: TextStyle = typoStyles[type];
	
  if (style) textStyle = { ...textStyle, ...style };
	if(white) textStyle = {...textStyle, color:whiteColor}
	if(spaceLeft) textStyle = {...textStyle, marginLeft:smallSpace}
	
	return (
    <Text {...other} style={textStyle}>
      {children}
    </Text>
  );
};

export default Typography;
