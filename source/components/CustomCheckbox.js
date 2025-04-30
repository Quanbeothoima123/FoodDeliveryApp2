import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function CustomCheckbox({ checked, onToggle, label }) {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.container}>
      <View style={[styles.checkbox, checked && styles.checkedBox]}>
        {checked && <Icon name="check" size={16} color="#fff" />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#E3EBF2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: "#FF7622",
  },
  label: {
    fontSize: 13,
    fontFamily: "Sen",
    fontWeight: "400", // đổi "regular" thành 400 để tránh lỗi
  },
});
