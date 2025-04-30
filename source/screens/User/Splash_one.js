import { View, Image, StyleSheet } from "react-native";
export default function Splash_one() {
  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/images/User/logo.png")} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
  },
});
