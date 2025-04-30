import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import Icon from "react-native-vector-icons/Ionicons";
import MenuButton from "../../components/MenuButton";
import CartButton from "../../components/CartButton";
import FeatherIcon from "react-native-vector-icons/Feather";

// Updated Category data with starting price
const categories = [
  {
    id: 1,
    namecategory: "Pizza",
    image: require("../../../assets/images/User/pizza.jpg"),
    starting: "$70",
  },
  {
    id: 2,
    namecategory: "Burger",
    image: require("../../../assets/images/User/burger.jpg"),
    starting: "$50",
  },
  {
    id: 3,
    namecategory: "Hot Dog",
    image: require("../../../assets/images/User/hot-dog.jpg"),
    starting: "$40",
  },
  {
    id: 4,
    namecategory: "Salad",
    image: require("../../../assets/images/User/salad.jpg"),
    starting: "$30",
  },
];

// Restaurant data (same as before)
const restaurants = [
  {
    id: 1,
    nameRestaurant: "Rose Garden Restaurant",
    image: require("../../../assets/images/User/rose-garden.jpg"),
    description: "Burger - Chicken - Riche - Wings",
    category: "Burger - Chicken - Riche - Wings",
    starRate: 4.7,
    feeShip: "Free",
    timeShipping: "20 min",
  },
  {
    id: 2,
    nameRestaurant: "Healthy Bowl",
    image: require("../../../assets/images/User/healthy-bowl.jpg"),
    description: "Salad - Vegan - Healthy",
    category: "Salad - Vegan - Healthy",
    starRate: 4.5,
    feeShip: "Free",
    timeShipping: "25 min",
  },
];

export default function HomeVer3() {
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.deliveryContainer}>
          <MenuButton
            backgroundColor="#ECF0F4"
            onPress={() => console.log("Open sidebar")}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.deliveryText}>DELIVER TO</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>Halal Lab office</Text>
              <Icon name="caret-down" size={16} color="#181C2E" />
            </View>
          </View>
        </View>
        <CartButton
          backgroundColor="#181C2E"
          onPress={() => console.log("Open cart")}
          badgeCount={2}
        />
      </View>

      {/* Greeting */}
      <Text style={styles.greetingText}>
        <Text>Hey Halal, </Text>
        <Text style={styles.timeText}>Good Afternoon!</Text>
      </Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search dishes, restaurants"
          style={styles.searchInput}
        />
      </View>

      {/* All Categories Section */}
      <View style={styles.categoryHeader}>
        <Text style={styles.sectionTitle}>All Categories</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>SEE ALL</Text>
          <FeatherIcon name="chevron-right" size={20} color={"#A0A5BA"} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItemContainer}>
            <View style={styles.categoryBackground}>
              <Image source={item.image} style={styles.categoryImage} />
            </View>
            <Text style={styles.categoryText}>{item.namecategory}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoryList}
      />

      {/* Open Restaurants Section */}
      <View style={styles.restaurantHeader}>
        <Text style={styles.sectionTitle}>Open Restaurants</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>SEE ALL</Text>
          <FeatherIcon name="chevron-right" size={20} color={"#A0A5BA"} />
        </TouchableOpacity>
      </View>
      {restaurants.map((restaurant) => (
        <TouchableOpacity key={restaurant.id} style={styles.restaurantItem}>
          <Image source={restaurant.image} style={styles.restaurantImage} />
          <Text style={styles.restaurantName}>{restaurant.nameRestaurant}</Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.description}
          </Text>
          <View style={styles.restaurantInfo}>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={14} color="#FF7622" />
              <Text style={styles.ratingText}>{restaurant.starRate}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon name="bicycle" size={14} color="#FF7622" />
              <Text style={styles.infoText}>{restaurant.feeShip}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon name="time-outline" size={14} color="#FF7622" />
              <Text style={styles.infoText}>{restaurant.timeShipping}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  deliveryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  deliveryText: {
    fontFamily: "Sen",
    fontSize: 12,
    fontWeight: "bold",
    color: "#FC6E2A",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontFamily: "Sen",
    fontSize: 14,
    fontWeight: "regular",
    color: "#676767",
    marginRight: 5,
  },
  greetingText: {
    fontFamily: "Sen",
    fontSize: 16,
    fontWeight: "regular",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  timeText: {
    fontSize: 16,
    fontFamily: "Sen",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 62,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontFamily: "Sen",
    fontSize: 14,
    color: "#888",
    fontWeight: "regular",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: "Sen",
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAllButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAllText: {
    fontFamily: "Sen",
    fontSize: 14,
    fontWeight: "regular",
    color: "#A0A5BA",
  },
  categoryList: {
    paddingHorizontal: 20,
  },
  categoryItemContainer: {
    marginRight: 15,
    alignItems: "center",
    width: 122, // Adjust width to match the spacing in the image
    height: 158,
  },
  categoryBackground: {
    width: 110, // Match the image width
    height: 110,
    backgroundColor: "#ffffff", // Light gray background to match the image
    borderRadius: 20, // Rounded corners for the container
    justifyContent: "center", // Center the image vertically
    alignItems: "center", // Center the image horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryImage: {
    width: 91,
    height: 81,
    borderRadius: 20, // Circular image
  },
  categoryText: {
    fontFamily: "Sen",
    fontSize: 14,
    fontWeight: "bold",
    color: "#32343E",
    textAlign: "center",
    marginTop: 5, // Space between the container and the text
  },
  restaurantHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  restaurantItem: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  restaurantImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  restaurantName: {
    fontFamily: "Sen",
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  restaurantDescription: {
    fontFamily: "Sen",
    fontSize: 14,
    fontWeight: "400",
    color: "#888",
    marginBottom: 10,
  },
  restaurantInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontFamily: "Sen",
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 5,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontFamily: "Sen",
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
    marginLeft: 5,
  },
});
