import { FlexStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import {
  poppinsBold,
  poppinsMedium,
  poppins,
  poppinsSemiBold,
  sfCompactText,
  sfCompactDisplayBold,
  sfCompactDisplay,
} from "./utils/fonts";

//#region Utils
export const centerContent: FlexStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const removeFontPadding: TextStyle = {
  includeFontPadding: false,
  padding: 0,
  textAlignVertical: "bottom",
};

export const rowDirectionMixin = (
  justifyContent?: FlexStyle["justifyContent"]
): FlexStyle => ({
  display: "flex",
  flexDirection: "row",
  justifyContent,
});

export const topRightMixin = (dist: number): ViewStyle => ({
  position: "absolute",
  top: dist,
  right: dist,
});

export const fill = { width: "100%", height: "100%" };
//#endregion

//#region Colors
export const whiteColor = "white";
export const blackColor = "black";
export const activeColor = "#A8FF76";
export const errorColor = "#FF445A";

export const plum200 = "#C692FD";
export const plum300 = "#993AFC";
export const plum500 = "#5603AD";
export const plum700 = "#390273";

export const blue100 = "#F0F8FF";
export const blue300 = "#B6DEFD";
export const blue500 = "#259DFA";

export const gray100 = "#E9EAEE";
export const gray300 = "#BFC1CC";
export const gray500 = "#9FA2B2";
//#endregion

//#region Variables
export const radius = 12;
export const bigRadius = 24;
export const smallSpace = 12;
export const bigSpace = 16;
export const authTopSpace = 76;
export const authBottomSpace = 31;
//#endregion

//#region Typography
export const typoStyles = StyleSheet.create({
  h1: {
    fontFamily: poppinsBold,
    fontSize: 28,
    color: plum500,
    ...removeFontPadding,
  },
  h2: { fontFamily: poppinsBold, fontSize: 22 },
  h3: { fontFamily: poppinsBold, fontSize: 15 },
  h4: { fontFamily: poppinsSemiBold, fontSize: 14 },

  buttonText: {
    fontFamily: poppinsSemiBold,
    fontSize: 16,
    letterSpacing: 1,
    color: whiteColor,
  },
  buttonTextSmall: {
    fontFamily: poppinsSemiBold,
    fontSize: 14,
    letterSpacing: 1,
    color: plum500,
  },
  label: { fontFamily: poppinsMedium },

  titleAndInput: { fontFamily: poppinsMedium, fontSize: 15, lineHeight: 20 },
  caption: {
    fontFamily: poppins,
    fontSize: 10,
    lineHeight: 10,
    color: gray500,
  },

  bodyText: { fontFamily: sfCompactText, fontSize: 14 },
  caption2: { fontFamily: sfCompactDisplayBold, fontSize: 12, lineHeight: 16 },
  specialText: { fontFamily: sfCompactDisplay, fontSize: 12, lineHeight: 16 },
});
//#endregion
