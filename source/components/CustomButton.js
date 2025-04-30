import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useCustomFonts } from "../hooks/useCustomFonts";

const CustomButton = ({
  title,
  backgroundColor = "#3498db",
  onPress,
  style,
  textColor = "#fff",
}) => {
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor }, style]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 62,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Sen",
  },
});

export default CustomButton;
