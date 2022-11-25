import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { FontSource } from "@expo-google-fonts/poppins/useFonts";
import { FontNames } from "../fonts";
import { handleError } from "../errors";

const FONTS: Record<FontNames, FontSource> = {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  "SF Compact Text": require("../../assets/fonts/SFCompactText-Regular.ttf"),
  "SF Compact Display": require("../../assets/fonts/SFCompactDisplay-Regular.ttf"),
  "SF Compact Display Bold": require("../../assets/fonts/SFCompactDisplay-Bold.ttf"),
};

export function useLoadFonts() {
  const [fontsLoaded, error] = useFonts(FONTS);
  if (error) handleError(error);
  return fontsLoaded;
}
