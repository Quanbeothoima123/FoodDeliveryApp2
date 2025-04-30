import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import Icon from "react-native-vector-icons/Ionicons";

export default function Location_Access() {
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/User/location_acess.png")}
        style={styles.topImage}
      />
      <TouchableOpacity
        onPress={() => console.log("GET STARTED")}
        style={styles.simpleButton}
        activeOpacity={0.8}
      >
        <Text style={styles.simpleButtonText}>ACCESS LOCATION</Text>
        <View style={styles.iconContainer}>
          <Icon name="location-outline" color="#ffffff" size={16} />
        </View>
      </TouchableOpacity>
      <View>
        <Text style={styles.description}>
          DFOOD WILL ACCESS YOUR LOCATION ONLY WHILE USING THE APP
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  topImage: {
    marginTop: 150,
  },
  simpleButton: {
    marginTop: 100,
    flexDirection: "row",
    width: "100%",
    height: 62,
    borderRadius: 10,
    backgroundColor: "#FF7622",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  simpleButtonText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Sen",
    color: "#FFFFFF",
  },
  iconContainer: {
    backgroundColor: "#FF914E",
    borderRadius: 50,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Sen",
    fontWeight: "400",
    marginTop: 30,
  },
});
