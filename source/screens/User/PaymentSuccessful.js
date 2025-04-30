import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useCustomFonts } from "../../hooks/useCustomFonts";
const PaymentSuccessScreen = () => {
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      <View style={styles.placeholderImage}>
        <Image
          source={require("../../../assets/images/User/paymentSuccess.png")}
          resizeMode="contain"
          style={{ width: "100%" }}
        />
      </View>
      {/* Tiêu đề và mô tả */}
      <Text style={styles.title}>Congratulations!</Text>
      <Text style={styles.description}>
        You successfully made a payment, enjoy our service!
      </Text>

      {/* Nút Track Order */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="TRACK ORDER"
          backgroundColor="#FF7622"
          textColor="#FFFFFF"
          onPress={() => console.log("Add and make payment")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  placeholderImage: {
    width: 228,
    height: 207,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    fontFamily: "Sen",
    fontWeight: "bold",
    color: "#1A202C", // Màu chữ tối
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Sen",
    color: "#525C67", // Màu chữ xám
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
  },
});

export default PaymentSuccessScreen;
