import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import CustomButton from "../../components/CustomButton";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import NumberInputBoxes from "../../components/NumberInputBoxes";
import BackButton from "../../components/BackButtonProps";

export default function VerificationScreen() {
  const fontsLoaded = useCustomFonts();

  const [countdown, setCountdown] = useState(50);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    if (canResend) {
      setCountdown(50);
      setCanResend(false);
      console.log("Resend code");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <BackButton
          top={70}
          left={20}
          backgroundColor="#FFFFFF"
          zIndex={999}
          onPress={() => console.log("Back button pressed")}
        />

        <Image
          source={require("../../../assets/images/User/circleDark.png")}
          style={[styles.topImageLeft, { zIndex: 1 }]}
        />
        <Image
          source={require("../../../assets/images/User/decore.png")}
          style={[styles.topImageRight, { zIndex: 1 }]}
        />

        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>We sent a code for you</Text>
        <Text style={styles.emailText}>example@gmail.com</Text>

        <View style={styles.imageContainer}>
          <View style={styles.imageBackground}>
            <View style={styles.formContainer}>
              <View style={styles.codeContainer}>
                <Text style={styles.label}>CODE</Text>
                <View style={styles.resendContainer}>
                  <TouchableOpacity
                    onPress={handleResend}
                    disabled={!canResend}
                  >
                    <Text
                      style={[
                        styles.resendText,
                        canResend && styles.resendTextActive, // Đổi màu khi có thể nhấn
                      ]}
                    >
                      Resend
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={styles.countdownText}
                  >{` in ${countdown} sec`}</Text>
                </View>
              </View>

              <NumberInputBoxes />
              <CustomButton
                title="VERIFY"
                backgroundColor="#FF7622"
                textColor="#FFFFFF"
                onPress={() => console.log("GET STARTED")}
                style={styles.verifyButton} // Thêm style cho khoảng cách
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121223",
    alignItems: "center",
    paddingTop: 70,
  },
  topImageLeft: {
    position: "absolute",
    top: -120,
    left: -140,
  },
  topImageRight: {
    position: "absolute",
    top: -80,
    right: -100,
  },
  title: {
    fontFamily: "Sen",
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 65,
  },
  subtitle: {
    fontFamily: "Sen",
    fontSize: 16,
    fontWeight: "400",
    color: "#FFFFFF",
    opacity: 0.85,
  },
  emailText: {
    fontFamily: "Sen",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  imageContainer: {
    width: "100%",
    height: 600,
    position: "absolute",
    bottom: -30,
    left: 0,
    overflow: "hidden",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    top: 0,
    left: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  formContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontFamily: "Sen",
    fontSize: 13,
    fontWeight: "400",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resendText: {
    color: "#32343E",
    fontFamily: "Sen",
    fontWeight: "bold",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  resendTextActive: {
    color: "#FF7622", // Màu khi có thể nhấn
  },
  countdownText: {
    fontFamily: "Sen",
    fontSize: 14,
    fontWeight: "400",
  },
  verifyButton: {
    marginVertical: 15, // Thay thế View marginVertical
  },
});
