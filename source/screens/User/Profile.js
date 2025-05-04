import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import { supabase } from "../../supabaseHelper/supabase";
import { getUserId } from "../../utils/authHelper";

const userAvatar = require("../../../assets/images/User/american-spicy.jpg");
const personalInfoIcon = require("../../../assets/images/User/personnal.png");
const addressesIcon = require("../../../assets/images/User/address.png");
const cartIcon = require("../../../assets/images/User/cart.png");
const favouriteIcon = require("../../../assets/images/User/favorite.png");
const notificationsIcon = require("../../../assets/images/User/notification.png");
const paymentMethodIcon = require("../../../assets/images/User/payment_method.png");
const faqsIcon = require("../../../assets/images/User/faqs.png");
const userReviewsIcon = require("../../../assets/images/User/user_review.png");
const settingsIcon = require("../../../assets/images/User/settings.png");
const logoutIcon = require("../../../assets/images/User/Logout.png");
const clockIcon = require("../../../assets/images/User/icons8-clock-50.png");

const ProfileScreen = () => {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    fullname: "Loading...",
    bio: "Loading...",
    avatar: null,
  });
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu từ Supabase
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userId = await getUserId();
        if (!userId) {
          setProfile({
            fullname: "Not logged in",
            bio: "Please log in",
            avatar: null,
          });
          return;
        }

        const { data, error } = await supabase
          .from("profile")
          .select("fullname, bio, avatar")
          .eq("userid", userId)
          .single();

        if (error) {
          throw new Error("Error fetching profile: " + error.message);
        }

        setProfile({
          fullname: data.fullname || "Not provided",
          bio: data.bio || "No bio available",
          avatar: data.avatar || null,
        });
      } catch (err) {
        console.log("Fetch profile error:", err);
        setProfile({
          fullname: "Error",
          bio: "Failed to load profile",
          avatar: null,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
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
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <FeatherIcon name="more-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
        <View style={styles.menuContainer}>
          {/* Personal Info */}
          <View style={styles.wrapMoreOption}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate("PersonalInfoScreen");
              }}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.IconButton}>
                  <Image source={personalInfoIcon} style={styles.menuIcon} />
                </View>
                <Text style={styles.menuText}>Personal Info</Text>
              </View>
              <FeatherIcon name="chevron-right" size={20} color={"#A0A5BA"} />
            </TouchableOpacity>

            {/* Addresses */}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.IconButton}>
                  <Image
                    source={addressesIcon}
                    style={styles.menuIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.menuText}>Addresses</Text>
              </View>
              <FeatherIcon name="chevron-right" size={20} color={"#A0A5BA"} />
            </TouchableOpacity>
            {/* History order and status*/}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.IconButton}>
                  <Image source={clockIcon} style={styles.menuIcon} />
                </View>
                <Text style={styles.menuText}>Personal Info</Text>
              </View>
              <FeatherIcon name="chevron-right" size={20} color={"#A0A5BA"} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapMoreOption}>
            {/* Cart */}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.IconButton}>
                  <Image
                    source={cartIcon}
                    style={styles.menuIcon}
                    resizeMode="contain"
                  />
                </View>

                <Text style={styles.menuText}>Cart</Text>
              </View>
              <FeatherIcon name="chevron-right" size={20} color={"#A0A5BA"} />
            </TouchableOpacity>

            {/* Favourite */}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.IconButton}>
                  <Image
                    source={favouriteIcon}
                    style={styles.menuIcon}
                    resizeMode="contain"
                  />
                </View>

                <Text style={styles.menuText}>Favourite</Text>
              </View>
              <FeatherIcon name="chevron-right" size={20} color={"#A0A5BA"} />
            </TouchableOpacity>

            {/* Notifications */}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.IconButton}>
                  <Image source={notificationsIcon} style={styles.menuIcon} />
                </View>
                <Text style={styles.menuText}>Notifications</Text>
              </View>
              <FeatherIcon name="chevron-right" size={20} color={"#A0A5BA"} />
            </TouchableOpacity>

            {/* Payment Method */}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.IconButton}>
                  <Image
                    source={paymentMethodIcon}
                    style={styles.menuIcon}
                    resizeMode="contain"
                  />
                </View>

                <Text style={styles.menuText}>Payment Method</Text>
              </View>
              <FeatherIcon name="chevron-right" size={20} color={"#A0A5BA"} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapMoreOption}>
            {/* FAQs */}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.IconButton}>
                  <Image
                    source={faqsIcon}
                    style={styles.menuIcon}
                    resizeMode="contain"
                  />
                </View>

                <Text style={styles.menuText}>FAQs</Text>
              </View>
              <FeatherIcon name="chevron-right" size={20} color={"#A0A5BA"} />
            </TouchableOpacity>

            {/* User Reviews */}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.IconButton}>
                  <Image
                    source={userReviewsIcon}
                    style={styles.menuIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.menuText}>User Reviews</Text>
              </View>
              <FeatherIcon name="chevron-right" size={20} color={"#A0A5BA"} />
            </TouchableOpacity>

            {/* Settings */}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.IconButton}>
                  <Image
                    source={settingsIcon}
                    style={styles.menuIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.menuText}>Settings</Text>
              </View>
              <FeatherIcon name="chevron-right" size={20} color={"#A0A5BA"} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapMoreOption}>
            {/* Log Out */}
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.IconButton}>
                  <Image
                    source={logoutIcon}
                    style={styles.menuIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.menuText}>Log Out</Text>
              </View>
              <FeatherIcon name="chevron-right" size={20} color={"#A0A5BA"} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
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
    fontWeight: "400",
    marginLeft: 15,
  },
  wrapMoreOption: {
    backgroundColor: "#F6F8FA",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 20,
  },
  menuButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECF0F4",
    overflow: "hidden",
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFDAB9",
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: "Sen",
    fontWeight: "bold",
  },
  profileBio: {
    fontSize: 14,
    fontFamily: "Sen",
    color: "#A0A5BA",
    marginTop: 5,
  },
  menuContainer: {
    paddingHorizontal: 10,
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
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    width: 12,
    height: 14,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "400",
  },
  chevronIcon: {
    width: 24,
    height: 24,
  },
});

export default ProfileScreen;
