import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import CustomButton from "../../components/CustomButton";

export default function OnBoarding_two() {
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/User/greyImage.png")}
        style={styles.topImage}
      />
      <Text style={styles.title}>Easy for ordering</Text>
      <Text style={styles.description}>
        Get all your loved foods in one once place, you just place the order we
        do the rest
      </Text>
      <Image
        source={require("../../../assets/images/User/SlideOnBoardingTwo.png")}
        style={styles.bottomImage}
      />
      <CustomButton
        title="Next"
        backgroundColor="#FF7622"
        textColor="#FFFFFF"
        onPress={() => console.log("Next")}
      />
      <TouchableOpacity style={styles.skipButton}>
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
