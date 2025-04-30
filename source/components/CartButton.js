import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const CartButton = ({ backgroundColor, onPress, badgeCount = 2 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor }]}
    >
      <Icon name="shopping-bag" size={24} color="#ffffff" />
      {badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
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
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#FF7622",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default CartButton;
