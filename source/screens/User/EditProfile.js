import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import CustomButton from "../../components/CustomButton";
const EditProfileScreen = () => {
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {/* Header với nút back và tiêu đề */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => console.log("Go back")}
        >
          <Icon name="chevron-back" size={24} color="#181C2E" />
        </TouchableOpacity>
        <Text style={[styles.title, { fontFamily: "Sen" }]}>Edit Profile</Text>
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View>
          <Image
            style={styles.avatarProfile}
            source={require("../../../assets/images/User/american-spicy.jpg")}
          />
          <TouchableOpacity style={styles.editAvatar}>
            <FeatherIcon name="edit-2" size={15} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Các trường nhập liệu */}
      <Text style={[styles.label, { fontFamily: "Sen" }]}>FULL NAME</Text>
      <TextInput
        style={[styles.input, { fontFamily: "Sen" }]}
        value="Vishal Khadok"
        placeholderTextColor="#6B6E82"
      />

      <Text style={[styles.label, { fontFamily: "Sen" }]}>EMAIL</Text>
      <TextInput
        style={[styles.input, { fontFamily: "Sen" }]}
        value="hello@hatlab.co"
        placeholderTextColor="#6B6E82"
      />

      <Text style={[styles.label, { fontFamily: "Sen" }]}>PHONE NUMBER</Text>
      <TextInput
        style={[styles.input, { fontFamily: "Sen" }]}
        value="408-841-0926"
        placeholderTextColor="#6B6E82"
      />

      <Text style={[styles.label, { fontFamily: "Sen" }]}>BIO</Text>
      <TextInput
        style={[styles.input, { fontFamily: "Sen" }]}
        value="I love fast food"
        placeholderTextColor="#999"
      />

      <View style={styles.buttonContainer}>
        <CustomButton
          title="SAVE"
          backgroundColor="#FF7622"
          textColor="#FFFFFF"
          onPress={() => console.log("Add and make payment")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
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
    fontWeight: "bold",
    color: "#181C2E",
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarProfile: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  editAvatar: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bottom: 40,
    right: -90,
    backgroundColor: "#FF7622",
    borderRadius: 20.5,
    width: 41,
    height: 41,
  },
  editIcon: {
    fontSize: 16,
    color: "#fff",
  },
  label: {
    fontSize: 14,
    color: "#32343E",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F0F5FA",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
    height: 56,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
  },
});

export default EditProfileScreen;
