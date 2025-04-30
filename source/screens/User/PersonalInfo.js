import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useCustomFonts } from "../../hooks/useCustomFonts";
// Placeholder images for the user avatar and icons
const userAvatar = require("../../../assets/images/User/american-spicy.jpg"); // Replace with actual image path, e.g., require('../assets/userAvatar.png')
const fullNameIcon = require("../../../assets/images/User/personnal.png"); // Replace with actual image path
const emailIcon = require("../../../assets/images/User/mail.png"); // Replace with actual image path
const phoneIcon = require("../../../assets/images/User/call.png"); // Replace with actual image path

const PersonalInfoScreen = () => {
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => console.log("Go back")}
          >
            <Icon name="chevron-back" size={24} color="#181C2E" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Personal Info</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.editButton}>EDIT</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileSection}>
        <Image
          source={userAvatar}
          style={styles.avatar}
          defaultSource={{ uri: "https://via.placeholder.com/80" }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Vishal Khadok</Text>
          <Text style={styles.profileBio}>I love fast food</Text>
        </View>
      </View>
      <View style={styles.infoSection}>
        {/* Full Name */}
        <View style={styles.infoItem}>
          <View style={styles.infoItemLeft}>
            <View style={styles.IconButton}>
              <Image source={fullNameIcon} style={styles.infoIcon} />
            </View>

            <View>
              <Text style={styles.infoLabel}>FULL NAME</Text>
              <Text style={styles.infoValue}>Vishal Khadok</Text>
            </View>
          </View>
        </View>

        {/* Email */}
        <View style={styles.infoItem}>
          <View style={styles.infoItemLeft}>
            <View style={styles.IconButton}>
              <Image
                source={emailIcon}
                style={styles.infoIcon}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.infoLabel}>EMAIL</Text>
              <Text style={styles.infoValue}>hello@halalab.co</Text>
            </View>
          </View>
        </View>

        {/* Phone Number */}
        <View style={styles.infoItem}>
          <View style={styles.infoItemLeft}>
            <View style={styles.IconButton}>
              <Image
                source={phoneIcon}
                style={styles.infoIcon}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.infoLabel}>PHONE NUMBER</Text>
              <Text style={styles.infoValue}>408-841-0926</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECF0F4",
    overflow: "hidden",
  },
  headerText: {
    fontSize: 17,
    fontFamily: "Sen",
    fontWeight: "400",
    marginLeft: 15,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  editButton: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF8C00",
  },
  profileSection: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFDAB9", // Peach color for placeholder
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Sen",
  },
  profileBio: {
    fontSize: 14,
    fontFamily: "Sen",
    color: "#A0A5BA",
    marginTop: 5,
  },
  infoSection: {
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: "#F6F8FA",
    borderRadius: 20,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  infoItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  IconButton: {
    width: 40,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 15,
  },
  infoIcon: {
    width: 12,
    height: 14,
  },
  infoLabel: {
    fontSize: 14,
    color: "#32343E",
    fontFamily: "Sen",
  },
  infoValue: {
    fontSize: 14,
    fontFamily: "Sen",
    color: "#6B6E82",
    marginTop: 5,
  },
});

export default PersonalInfoScreen;
