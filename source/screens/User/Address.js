import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import CustomButton from "../../components/CustomButton";

const MyAddressScreen = () => {
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;

  const addresses = [
    {
      type: "HOME",
      address: "2464 Royal Ln. Mesa, New Jersey 45463",
      icon: require("../../../assets/images/User/home.png"),
    },
    {
      type: "WORK",
      address: "3891 Ranchview Dr. Richardson, California 62639",
      icon: require("../../../assets/images/User/work.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => console.log("Go back")}
        >
          <Ionicons name="chevron-back" size={24} color="#181C2E" />
        </TouchableOpacity>
        <Text style={[styles.title, { fontFamily: "Sen" }]}>My Address</Text>
      </View>

      {addresses.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <View style={styles.IconButton}>
              <Image
                source={item.icon}
                style={styles.menuIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.addressContainer}>
              <View style={styles.menuItemHeader}>
                <Text style={[styles.menuText, { fontFamily: "Sen" }]}>
                  {item.type}
                </Text>
                <View style={styles.menuItemRight}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Feather name="edit" size={15} color="#FF7622" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Feather name="trash-2" size={15} color="#FF7622" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[styles.addressText, { fontFamily: "Sen" }]}>
                {item.address}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.buttonContainer}>
        <CustomButton
          title="ADD NEW ADDRESS"
          backgroundColor="#FF7622"
          textColor="#FFFFFF"
          onPress={() => console.log("Add new address")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECF0F4",
    overflow: "hidden",
    marginRight: 20,
  },
  title: {
    fontSize: 17,
    color: "#32343E",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F5F7FA",
    borderRadius: 10,
    height: 101,
    width: 330,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemRight: {
    flexDirection: "row",
  },
  menuItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  IconButton: {
    width: 48,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: "#fff",
    marginRight: 15,
    marginLeft: 15,
  },
  menuIcon: {
    width: 12,
    height: 14,
  },
  menuText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#32343E",
  },
  addressContainer: {
    flex: 1,
    maxWidth: 230, // Giới hạn chiều rộng để văn bản xuống dòng
  },
  addressText: {
    fontSize: 14,
    color: "#91949C",
    marginTop: 8,
    flexWrap: "wrap", // Cho phép văn bản xuống dòng
  },
  actionButton: {
    marginLeft: 15,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
  },
});

export default MyAddressScreen;
