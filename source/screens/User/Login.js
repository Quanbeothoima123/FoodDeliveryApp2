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
import CustomCheckbox from "../../components/CustomCheckbox";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import SocialButton from "../../components/SocialButton";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { supabase } from "../../supabaseHelper/supabase";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation(); // Thêm navigation
  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState(""); // Thêm state cho email
  const [password, setPassword] = useState(""); // Thêm state cho password
  const [loading, setLoading] = useState(false); // Thêm state cho loading

  if (!fontsLoaded) return null;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập email và mật khẩu!");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        Alert.alert(
          "Lỗi",
          "Email chưa được xác thực. Vui lòng kiểm tra email để xác thực tài khoản!"
        );
      } else {
        Alert.alert(
          "Lỗi đăng nhập",
          "Tài khoản của bạn chưa tồn tại trong hệ thống"
        );
      }
    } else {
      Alert.alert("Thành công", "Đăng nhập thành công!");
      navigation.navigate("HomeVer1");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/images/User/circleDark.png")}
          style={styles.topImageLeft}
        />
        <Image
          source={require("../../../assets/images/User/decore.png")}
          style={styles.topImageRight}
        />
        <Text style={styles.title}>Log In</Text>
        <Text style={styles.subtitle}>
          Please sign in to your existing account
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

              <Text style={[styles.label, styles.passwordLabel]}>Password</Text>
              <CustomTextInput
                placeholder="Enter your password"
                secureTextEntry={!isPasswordVisible}
                iconName={isPasswordVisible ? "eye" : "eye-off"}
                onIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
                value={password}
                onChangeText={setPassword}
              />

              <View style={styles.optionRow}>
                <CustomCheckbox
                  checked={isChecked}
                  onToggle={() => setIsChecked(!isChecked)}
                  label="Remember me"
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgotPassWord")} // Điều hướng tới ForgotPassWord
                >
                  <Text style={styles.forgotPasswordText}>Forgot password</Text>
                </TouchableOpacity>
              </View>

              <CustomButton
                title="LOG IN"
                backgroundColor="#FF7622"
                textColor="#FFFFFF"
                onPress={handleLogin}
                disabled={loading}
              />

              <View style={styles.signUpRow}>
                <Text style={styles.signUpText}>Don’t have an account?</Text>
                <TouchableOpacity
                  style={styles.signUpButton}
                  onPress={() => navigation.navigate("SignUp")} // Điều hướng tới SignUp
                >
                  <Text style={styles.signUpButtonText}>SIGN UP</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.orText}>Or</Text>

              <View style={styles.socialRow}>
                <SocialButton icon="facebook" backgroundColor="#395998" />
                <SocialButton icon="google" backgroundColor="#db4437" />
                <SocialButton icon="apple" backgroundColor="#1B1F2F" />
              </View>
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
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: "#FF7622",
    fontFamily: "Sen",
    fontSize: 14,
    fontWeight: "400",
  },
  signUpRow: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpText: {
    fontFamily: "Sen",
    fontSize: 16,
    fontWeight: "400",
  },
  signUpButton: {
    marginLeft: 5,
  },
  signUpButtonText: {
    color: "#FF7622",
    fontFamily: "Sen",
    fontSize: 14,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginTop: 30,
    fontFamily: "Sen",
    fontSize: 16,
    fontWeight: "400",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
