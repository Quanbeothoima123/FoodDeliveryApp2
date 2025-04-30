import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

const MenuButton = ({ backgroundColor, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor }]}
    >
      <Image
        source={require("../../assets/images/User/Menu.png")}
        style={styles.imageIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imageIcon: {
    width: 16,
    height: 16,
  },
});

export default MenuButton;
