import { View, StyleSheet, ImageBackground, Image, Text } from "react-native";
export default function Splash_two() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/User/circleGray.png")}
        style={styles.imgCircleGray}
      />
      <Image source={require("../../../assets/images/User/logo.png")} />
      <Image
        source={require("../../../assets/images/User/circleOrange.png")}
        style={styles.imgCircleOrange}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignItems: "center",
  },
  imgCircleGray: {
    position: "absolute",
    top: -170,
    left: -100,
  },
  imgCircleOrange: {
    position: "absolute",
    bottom: -300,
    right: -300,
  },
});
