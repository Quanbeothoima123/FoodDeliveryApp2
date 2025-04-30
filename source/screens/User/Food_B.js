import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useCustomFonts } from "../../hooks/useCustomFonts";
// Dữ liệu không thay đổi, giữ nguyên popularBurgers, restaurants, categories và renderBurgerItem
const popularBurgers = [
  {
    burgerId: 1,
    burgerName: "Burger Bistro",
    restaurantName: "Rose Garden",
    price: 40,
    imageUrl: require("../../../assets/images/User/burger1.jpg"),
  },
  {
    burgerId: 2,
    burgerName: "Smokin' Burger",
    restaurantName: "Cafenio Restaurant",
    price: 60,
    imageUrl: require("../../../assets/images/User/burger2.jpg"),
  },
  {
    burgerId: 3,
    burgerName: "Buffalo Burgers",
    restaurantName: "Koji Film Kitchen",
    price: 75,
    imageUrl: require("../../../assets/images/User/burger3.jpg"),
  },
  {
    burgerId: 4,
    burgerName: "Bullseye Burgers",
    restaurantName: "Kabob Restaurant",
    price: 94,
    imageUrl: require("../../../assets/images/User/burger4.jpg"),
  },
];

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

const categories = [
  { id: 1, name: "BURGER" },
  { id: 2, name: "PIZZA" },
  { id: 3, name: "SALAD" },
  { id: 4, name: "HOT-DOG" },
];

const renderBurgerItem = ({ item }) => (
  <View style={styles.burgerItem}>
    <Image source={item.imageUrl} style={styles.burgerImage} />
    <Text style={styles.burgerName}>{item.burgerName}</Text>
    <Text style={styles.restaurantName}>{item.restaurantName}</Text>
    <View style={styles.priceContainer}>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const FoodScreen = () => {
  const fontsLoaded = useCustomFonts();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("BURGER");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };
  if (!fontsLoaded) return null;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header được bọc trong ScrollView */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => console.log("Go back")}
        >
          <Icon name="chevron-back" size={24} color="#181C2E" />
        </TouchableOpacity>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={toggleDropdown}
          >
            <Text style={styles.dropdownButtonText}>{selectedCategory}</Text>
            <Text style={styles.dropdownArrow}>
              {isDropdownOpen ? (
                <Icon name="caret-up" size={20} color="#F58D1D" />
              ) : (
                <Icon name="caret-down" size={20} color="#F58D1D" />
              )}
            </Text>
          </TouchableOpacity>
          {isDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {categories
                .filter((cat) => cat.name !== selectedCategory)
                .map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.dropdownItem}
                    onPress={() => selectCategory(item.name)}
                  >
                    <Text style={styles.dropdownText}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <FeatherIcon name="sliders" size={20} color="#181C2E" />
        </TouchableOpacity>
      </View>

      {/* Nội dung còn lại */}
      <Text style={styles.sectionTitle}>Popular Burgers</Text>
      <FlatList
        data={popularBurgers}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.burgerItem}>
            <View
              style={{
                position: "relative",
                alignItems: "center",
                overflow: "visible",
              }}
            >
              <Image source={item.imageUrl} style={styles.burgerImage} />
              <View style={styles.burgerInfo}>
                <Text style={styles.burgerName}>{item.burgerName}</Text>
                <Text style={styles.restaurantNamePop}>
                  {item.restaurantName}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.burgerPrice}>${item.price}</Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#F58D1D",
                      width: 30,
                      height: 30,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 15,
                    }}
                  >
                    <Icon name="add-outline" size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.burgerId.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        scrollEnabled={false}
      />

      <Text style={styles.sectionTitle}>Open Restaurants</Text>
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
      {/* Thêm padding dưới cùng để tránh nội dung bị cắt */}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

// Styles giữ nguyên, chỉ điều chỉnh container nếu cần
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // paddingHorizontal: ,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 15,
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
  backText: {
    fontSize: 16,
  },
  dropdownContainer: {
    position: "relative",
    marginLeft: -25,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ECF0F4",
  },
  dropdownButtonText: {
    fontSize: 12,
    fontFamily: "Sen",
    fontWeight: "bold",
    color: "#000",
  },
  dropdownArrow: {
    marginLeft: 5,
    fontSize: 12,
  },
  dropdownMenu: {
    position: "absolute",
    top: 50,
    left: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 100,
    maxHeight: 150,
    overflow: "scroll",
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  searchButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121223",
    overflow: "hidden",
    marginRight: -20,
  },
  searchText: {
    fontSize: 16,
    color: "#fff",
  },
  sortButton: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
  },
  sortText: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "400",
    marginVertical: 10,
    paddingLeft: 20,
  },
  burgerItem: {
    flex: 1,
    alignItems: "center",
    marginBottom: 15,
    paddingTop: 30, // Để ảnh nổi không bị cắt
    width: 140,
    height: 180,
  },

  burgerImage: {
    width: 110,
    height: 84,
    borderRadius: 20,
    position: "absolute",
    top: -30,
    zIndex: 1,
  },

  burgerInfo: {
    width: 140,
    height: 120,
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingTop: 40, // Cho ảnh nổi phía trên
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  burgerName: {
    marginTop: 10,
    fontFamily: "Sen",
    fontSize: 15,
    fontWeight: "bold",
    color: "#32343E",
    textAlign: "left",
    marginBottom: 5,
  },

  burgerPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#32343E",
    textAlign: "right",
  },

  restaurantNamePop: {
    fontSize: 13,
    fontWeight: 400,
    color: "#666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#ff8c00",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
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

export default FoodScreen;
