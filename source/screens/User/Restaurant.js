import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { useEffect } from "react";
import Carousel from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import BackButton from "../../components/BackButtonProps";
import MoreButton from "../../components/MoreButton";
import FilterComponent from "../../components/FilterComponent";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import PromoModal from "../../components/ProModal";
// Restaurant data with your image paths
const restaurantData = {
  id: 1,
  image:
    "../../../assets/images/User/healthy-bowl.jpg,../../../assets/images/User/pansi.jpg,../../../assets/images/User/restaurant3.jpg",
  starRate: "4.7",
  feeShip: "Free",
  timeShiping: "20 min",
  nameRestaurent: "Spicy restaurant",
  description:
    "Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
  category: "Burger,Sandwich,Pizza,Sanwi",
};

// Your popularBurgers data
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

const RestaurantScreen = () => {
  const fontsLoaded = useCustomFonts();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Burger");

  // Define carousel items with static require statements
  const carouselItems = [
    { id: 1, image: require("../../../assets/images/User/healthy-bowl.jpg") },
    { id: 2, image: require("../../../assets/images/User/pansi.jpg") },
    { id: 3, image: require("../../../assets/images/User/restaurant3.jpg") },
  ];

  // Process categories
  const categories = restaurantData.category
    .split(",")
    .map((cat) => cat.trim());

  // Render carousel item
  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
    </View>
  );

  // Render category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        activeCategory === item ? styles.activeCategory : null,
      ]}
      onPress={() => setActiveCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          activeCategory === item ? styles.activeCategoryText : null,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  // Custom pagination component
  const Pagination = () => (
    <View style={styles.paginationContainer}>
      {carouselItems.map((_, index) => {
        const isActive = index === activeSlide;
        return (
          <View
            key={index}
            style={[
              styles.dotWrapper,
              isActive && styles.dotWrapperActive, // thêm viền nếu active
            ]}
          >
            <View
              style={[
                styles.dot,
                isActive ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          </View>
        );
      })}
    </View>
  );
  if (!fontsLoaded) return null;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <FilterComponent
        visible={isFilterVisible}
        onClose={() => {
          console.log("Closing modal");
          setIsFilterVisible(false);
        }}
      />
      {/* Carousel */}
      <View style={styles.carouselContainer}>
        <Carousel
          width={Dimensions.get("window").width}
          height={300}
          data={carouselItems}
          renderItem={renderCarouselItem}
          onSnapToItem={(index) => setActiveSlide(index)}
          loop={true}
          scrollAnimationDuration={1000}
        />
        <Pagination />
        <BackButton
          top={20}
          left={20}
          backgroundColor="#FFF"
          onPress={() => console.log("Back pressed")}
        />
        <MoreButton
          top={20}
          right={20}
          backgroundColor="#FFF"
          onPress={() => {
            console.log("Opening modal");
            setIsFilterVisible(true);
          }}
        />
      </View>

      {/* Restaurant Info */}
      <View style={styles.infoContainer}>
        <View style={styles.ratingDelivery}>
          <View style={styles.ratingDeliveryRow}>
            <FeatherIcon name="star" size={20} color="#FF7622" />
            <Text style={styles.rating}>{restaurantData.starRate}</Text>
          </View>
          <View style={styles.ratingDeliveryRow}>
            <Image source={require("../../../assets/images/User/truck.png")} />
            <Text style={styles.delivery}>{restaurantData.feeShip}</Text>
          </View>

          <View style={styles.ratingDeliveryRow}>
            <FeatherIcon name="clock" size={20} color="#FF7622" />
            <Text style={styles.time}> {restaurantData.timeShiping}</Text>
          </View>
        </View>

        <Text style={styles.restaurantName}>
          {restaurantData.nameRestaurent}
        </Text>
        <Text style={styles.description}>{restaurantData.description}</Text>
      </View>

      {/* Categories */}
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />
      <View style={styles.categoryTitleCount}>
        <Text style={styles.categoryTitleCountText}>Burgur (10)</Text>
      </View>
      {/* Burgers */}
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
        scrollEnabled={false} // Disable FlatList scrolling to avoid conflicts
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  contentContainer: {
    paddingBottom: 20, // Ensure content isn’t cut off at the bottom
  },
  carouselContainer: {
    position: "relative",
  },
  carouselItem: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  dotWrapperActive: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10, // làm tròn wrapper
    borderWidth: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
  },
  dotWrapper: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4, // thêm khoảng cách giữa các dot
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 7,
  },
  activeDot: {
    backgroundColor: "#FFF",
  },
  inactiveDot: {
    backgroundColor: "#FFF",
    opacity: 0.4,
  },
  infoContainer: {
    padding: 20,
  },
  ratingDelivery: {
    flexDirection: "row",
    width: 250,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingDeliveryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Sen",
    marginLeft: 6,
  },
  delivery: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Sen",
    marginLeft: 6,
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Sen",
    marginLeft: 6,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Sen",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#A0A5BA",
    fontFamily: "Sen",
    lineHeight: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategory: {
    backgroundColor: "#F58D1D",
  },
  categoryText: {
    fontSize: 16,
    color: "#666",
  },
  activeCategoryText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  categoryTitleCount: {
    paddingHorizontal: 20,
    paddingVertical: "20",
  },
  categoryTitleCountText: {
    fontFamily: "Sen",
    fontWeight: "400",
    fontSize: 20,
  },
  // Your provided styles for burgers
  burgerItem: {
    flex: 1,
    alignItems: "center",
    marginBottom: 15,
    paddingTop: 30,
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
    paddingTop: 40,
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
    fontWeight: "400",
    color: "#666",
  },
});

export default RestaurantScreen;
