import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
export default function OnBoarding_three() {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/User/greyImage.png")}
        style={styles.topImage}
      />
      <Text style={styles.title}>Order from choosen chef</Text>
      <Text style={styles.description}>
        Get all your loved foods in one once place, you just place the order we
        do the rest
      </Text>
      <Image
        source={require("../../../assets/images/User/SlideOnBoardingThree.png")}
        style={styles.bottomImage}
      />
      <CustomButton
        title="Next"
        backgroundColor="#FF7622"
        textColor="#FFFFFF"
        onPress={() => navigation.navigate("OnBoarding_four")}
      />
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  topImage: {
    marginTop: 40,
  },
  title: {
    fontFamily: "Sen",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
  },
  description: {
    fontFamily: "Sen",
    fontSize: 16,
    fontWeight: "400", // React Native không hiểu "regular", dùng "400"
    textAlign: "center",
    marginTop: 20,
  },
  bottomImage: {
    marginTop: 30,
    marginBottom: 60,
  },
  skipButton: {
    marginTop: 10,
  },
  skipText: {
    fontFamily: "Sen",
    fontSize: 14,
    fontWeight: "400", // tương đương "regular"
  },
});
