// src/hooks/useCustomFonts.ts
import * as Font from "expo-font";
import { useFonts } from "expo-font";

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    Sen: require("../../assets/fonts/Sen-VariableFont_wght.ttf"),
  });

  return fontsLoaded;
};
