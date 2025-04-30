import React, { useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const NumberInputBoxes = () => {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  const handleInputChange = (text, nextInputRef, prevInputRef) => {
    if (text.length === 1 && nextInputRef) {
      nextInputRef.current?.focus();
    }
  };

  const handleBackspace = (text, prevInputRef) => {
    if (text.length === 0 && prevInputRef) {
      prevInputRef.current?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={input1Ref}
        style={styles.input}
        keyboardType="numeric"
        maxLength={1}
        placeholder="_"
        onChangeText={(text) => {
          handleInputChange(text, input2Ref);
        }}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            handleBackspace("", null);
          }
        }}
      />
      <TextInput
        ref={input2Ref}
        style={styles.input}
        keyboardType="numeric"
        maxLength={1}
        placeholder="_"
        onChangeText={(text) => {
          handleInputChange(text, input3Ref, input1Ref);
        }}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            handleBackspace("", input1Ref);
          }
        }}
      />
      <TextInput
        ref={input3Ref}
        style={styles.input}
        keyboardType="numeric"
        maxLength={1}
        placeholder="_"
        onChangeText={(text) => {
          handleInputChange(text, input4Ref, input2Ref);
        }}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            handleBackspace("", input2Ref);
          }
        }}
      />
      <TextInput
        ref={input4Ref}
        style={styles.input}
        keyboardType="numeric"
        maxLength={1}
        placeholder="_"
        onChangeText={(text) => {
          handleInputChange(text, null, input3Ref);
        }}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            handleBackspace("", input3Ref);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    width: 62,
    height: 62,
    borderRadius: 10,
    textAlign: "center",
    color: "#32343E",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Sen",
    backgroundColor: "#F0F5FA",
  },
});

export default NumberInputBoxes;
