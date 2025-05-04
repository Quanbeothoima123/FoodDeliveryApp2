import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../supabaseHelper/supabase";
import { getUserId } from "../../utils/authHelper";

// Placeholder images for the user avatar and icons
const userAvatar = require("../../../assets/images/User/american-spicy.jpg");
const fullNameIcon = require("../../../assets/images/User/personnal.png");
const emailIcon = require("../../../assets/images/User/mail.png");
const phoneIcon = require("../../../assets/images/User/call.png");

const PersonalInfoScreen = () => {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    fullname: "Loading...",
    email: "Loading...",
    phonenumber: "Loading...",
    bio: "Loading...",
    avatar: null, // Thêm avatar
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userId = await getUserId();
        if (!userId) {
          setError("No user logged in");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("profile")
          .select("fullname, email, phonenumber, bio, avatar") // Thêm avatar
          .eq("userid", userId)
          .single();

        if (error) {
          setError("Error fetching profile: " + error.message);
          setLoading(false);
          return;
        }

        if (data) {
          setProfile({
            fullname: data.fullname || "Not provided",
            email: data.email || "Not provided",
            phonenumber: data.phonenumber || "Not provided",
            bio: data.bio || "No bio available",
            avatar: data.avatar || null, // Thêm avatar
          });
        } else {
          setError("No profile data found");
        }
      } catch (err) {
        setError("Unexpected error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (!fontsLoaded) return null;
  if (loading)
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-back" size={24} color="#181C2E" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Personal Info</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfileScreen")}
        >
          <Text style={styles.editButton}>EDIT</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileSection}>
        <Image
          source={profile.avatar ? { uri: profile.avatar } : userAvatar}
          style={styles.avatar}
          defaultSource={{ uri: "https://via.placeholder.com/80" }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profile.fullname}</Text>
          <Text style={styles.profileBio}>{profile.bio}</Text>
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
              <Text style={styles.infoValue}>{profile.fullname}</Text>
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
              <Text style={styles.infoValue}>{profile.email}</Text>
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
              <Text style={styles.infoValue}>{profile.phonenumber}</Text>
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
    backgroundColor: "#FFDAB9",
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
    // paddingBottom: 10,
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
