import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const MoreButton = ({ top, right, backgroundColor, zIndex = 1, onPress }) => {
  const positionStyle = {
    position: "absolute",
    top,
    right,
    zIndex,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, positionStyle, { backgroundColor }]}
    >
      <Icon name="ellipsis-horizontal" size={24} color="#5E616F" />
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
});

export default MoreButton;
