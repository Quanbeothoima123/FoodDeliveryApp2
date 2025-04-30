import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useCustomFonts } from "../../hooks/useCustomFonts";
// Placeholder images for the user avatar and menu item icons
const userAvatar = require("../../../assets/images/User/american-spicy.jpg"); // Replace with actual image path, e.g., require('../assets/userAvatar.png')
const personalInfoIcon = require("../../../assets/images/User/personnal.png"); // Replace with actual image path
const addressesIcon = require("../../../assets/images/User/address.png"); // Replace with actual image path
const cartIcon = require("../../../assets/images/User/cart.png"); // Replace with actual image path
const favouriteIcon = require("../../../assets/images/User/favorite.png"); // Replace with actual image path
const notificationsIcon = require("../../../assets/images/User/notification.png"); // Replace with actual image path
const paymentMethodIcon = require("../../../assets/images/User/payment_method.png"); // Replace with actual image path
const faqsIcon = require("../../../assets/images/User/faqs.png"); // Replace with actual image path
const userReviewsIcon = require("../../../assets/images/User/user_review.png"); // Replace with actual image path
const settingsIcon = require("../../../assets/images/User/settings.png"); // Replace with actual image path
const logoutIcon = require("../../../assets/images/User/Logout.png"); // Replace with actual image path

const ProfileScreen = () => {
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
            source={userAvatar}
            style={styles.avatar}
            defaultSource={{ uri: "https://via.placeholder.com/80" }}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Vishal Khadok</Text>
            <Text style={styles.profileBio}>I love fast food</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          {/* Personal Info */}
          <View style={styles.wrapMoreOption}>
            <TouchableOpacity style={styles.menuItem}>
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
