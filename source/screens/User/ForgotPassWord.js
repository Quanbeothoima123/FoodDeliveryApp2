import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { supabase } from "../../supabaseHelper/supabase";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/BackButtonProps";

export default function ForgotPassWord() {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!fontsLoaded) return null;

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Lỗi", "Vui lòng nhập email!");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "exp://192.168.0.104:8081/--/auth/callback", // URL Expo Go
    });

    setLoading(false);

    if (error) {
      Alert.alert("Lỗi", error.message);
    } else {
      Alert.alert(
        "Thành công",
        "Email khôi phục mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư!"
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <BackButton
          top={70}
          left={20}
          backgroundColor="#FFFFFF"
          zIndex={999}
          onPress={() => navigation.goBack()} // Quay lại Login
        />
        <Image
          source={require("../../../assets/images/User/circleDark.png")}
          style={styles.topImageLeft}
        />
        <Image
          source={require("../../../assets/images/User/decore.png")}
          style={styles.topImageRight}
        />
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Please enter your email to reset password
        </Text>

        <View style={styles.imageContainer}>
          <View style={styles.imageBackground}>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Email</Text>
              <CustomTextInput
                placeholder="example@gmail.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <View style={{ marginVertical: 15 }}></View>
              <CustomButton
                title="SEND CODE"
                backgroundColor="#FF7622"
                textColor="#FFFFFF"
                onPress={handleForgotPassword}
                disabled={loading}
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
  label: {
    fontFamily: "Sen",
    fontSize: 13,
    fontWeight: "400",
  },
});
