import React, { useState } from "react";
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
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import BackButton from "../../components/BackButtonProps";
import { supabase } from "../../supabaseHelper/supabase";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRetypePasswordVisible, setReTypePasswordVisible] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!fontsLoaded) return null;

  const handleSignUp = async () => {
    if (password !== retypePassword) {
      Alert.alert("Lỗi", "Mật khẩu nhập lại không khớp!");
      return;
    }

    // Kiểm tra fullname và email không rỗng vì chúng là NOT NULL
    if (!fullname || !email) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ họ tên và email!");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullname },
        emailRedirectTo: "exp://192.168.0.104:8081/--/auth/callback",
      },
    });

    setLoading(false);

    if (error) {
      Alert.alert("Lỗi đăng ký", error.message);
      return;
    }

    // Không cần chèn thủ công vào profile nữa, trigger sẽ xử lý
    Alert.alert(
      "Thành công",
      "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản."
    );
    navigation.navigate("Login");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <BackButton
          top={70}
          left={20}
          backgroundColor="#FFFFFF"
          zIndex={999}
          onPress={() => navigation.goBack()}
        />
        <Image
          source={require("../../../assets/images/User/circleDark.png")}
          style={styles.topImageLeft}
        />
        <Image
          source={require("../../../assets/images/User/decore.png")}
          style={styles.topImageRight}
        />
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Please sign up to get started</Text>

        <View style={styles.imageContainer}>
          <View style={styles.imageBackground}>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Name</Text>
              <CustomTextInput
                placeholder="Your Full Name"
                value={fullname}
                onChangeText={setFullname}
              />

              <Text style={styles.label}>Email</Text>
              <CustomTextInput
                placeholder="example@gmail.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={[styles.label, styles.passwordLabel]}>Password</Text>
              <CustomTextInput
                placeholder="Enter your password"
                secureTextEntry={!isPasswordVisible}
                iconName={isPasswordVisible ? "eye" : "eye-off"}
                onIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
                value={password}
                onChangeText={setPassword}
              />

              <Text style={[styles.label, styles.passwordLabel]}>
                Re-Type Password
              </Text>
              <CustomTextInput
                placeholder="Enter your password"
                secureTextEntry={!isRetypePasswordVisible}
                iconName={isRetypePasswordVisible ? "eye" : "eye-off"}
                onIconPress={() =>
                  setReTypePasswordVisible(!isRetypePasswordVisible)
                }
                value={retypePassword}
                onChangeText={setRetypePassword}
              />

              <View style={styles.inputGap} />
              <CustomButton
                title="SIGN UP"
                backgroundColor="#FF7622"
                textColor="#FFFFFF"
                onPress={handleSignUp}
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
  passwordLabel: {
    marginTop: 15,
  },
  inputGap: {
    marginVertical: 20,
  },
});
