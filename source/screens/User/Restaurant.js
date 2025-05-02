import React, { useState, useEffect } from "react";
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
import Carousel from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import BackButton from "../../components/BackButtonProps";
import MoreButton from "../../components/MoreButton";
import FilterComponent from "../../components/FilterComponent";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import { supabase } from "../../supabaseHelper/supabase";
import { useNavigation, useRoute } from "@react-navigation/native";

const RestaurantScreen = () => {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();
  const route = useRoute();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [restaurant, setRestaurant] = useState(route.params?.restaurant || {});
  const [categoryMap, setCategoryMap] = useState({});

  // Lấy danh sách sản phẩm từ Supabase
  useEffect(() => {
    const fetchData = async () => {
      // Lấy danh sách category
      const { data: categoryData, error: catError } = await supabase
        .from("category")
        .select("id, name");
      if (!catError) {
        const map = categoryData.reduce((acc, cat) => {
          acc[cat.name] = cat.id;
          return acc;
        }, {});
        setCategoryMap(map);
      }

      // Lấy danh sách sản phẩm
      if (!restaurant.id) return;
      const { data: productData, error } = await supabase
        .from("product")
        .select("*")
        .eq("restaurantid", restaurant.id);
      if (error) {
        console.error("Error fetching products:", error);
        return;
      }
      setProducts(
        productData.map((product) => ({
          productId: product.id,
          productName: product.name,
          price: product.price,
          imageUrl: product.img,
          categoryId: product.categoryid,
        }))
      );
    };
    fetchData();
  }, [restaurant.id]);

  // Chuẩn bị dữ liệu cho carousel từ more_image
  const carouselItems = restaurant.more_image
    ? restaurant.more_image.map((img, index) => ({
        id: index + 1,
        image: img,
      }))
    : [];

  // Xử lý danh sách category
  // Xử lý danh sách category
  const categories = Array.isArray(restaurant.category)
    ? restaurant.category.map((cat) => cat.trim())
    : [];

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]); // Chọn category đầu tiên làm mặc định
    }
  }, [categories]);

  // Render carousel item
  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
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
            style={[styles.dotWrapper, isActive && styles.dotWrapperActive]}
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
        onClose={() => setIsFilterVisible(false)}
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
          onPress={() => navigation.goBack()}
        />
        <MoreButton
          top={20}
          right={20}
          backgroundColor="#FFF"
          onPress={() => setIsFilterVisible(true)}
        />
      </View>

      {/* Restaurant Info */}
      <View style={styles.infoContainer}>
        <View style={styles.ratingDelivery}>
          <View style={styles.ratingDeliveryRow}>
            <FeatherIcon name="star" size={20} color="#FF7622" />
            <Text style={styles.rating}>{restaurant.starRate}</Text>
          </View>
          <View style={styles.ratingDeliveryRow}>
            <FeatherIcon name="truck" size={20} color="#FF7622" />
            <Text style={styles.delivery}>
              {restaurant.feeShip === "Free" ? "Free" : restaurant.feeShip}
            </Text>
          </View>
          <View style={styles.ratingDeliveryRow}>
            <FeatherIcon name="clock" size={20} color="#FF7622" />
            <Text style={styles.time}>{restaurant.timeShipping}</Text>
          </View>
        </View>

        <Text style={styles.restaurantName}>{restaurant.nameRestaurant}</Text>
        <Text style={styles.description}>{restaurant.description}</Text>
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
        <Text style={styles.categoryTitleCountText}>
          {activeCategory} (
          {
            products.filter(
              (product) => categoryMap[activeCategory] === product.categoryId
            ).length
          }
          )
        </Text>
      </View>
      {/* Products */}
      <FlatList
        data={products.filter(
          (product) => categoryMap[activeCategory] === product.categoryId
        )}
        renderItem={({ item }) => (
          <View style={styles.burgerItem}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("FoodDetail", {
                  productId: item.productId,
                })
              }
              style={{
                position: "relative",
                alignItems: "center",
                overflow: "visible",
              }}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.burgerImage}
              />
              <View style={styles.burgerInfo}>
                <Text style={styles.burgerName}>{item.productName}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.burgerPrice}>${item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                position: "relative",
                bottom: 40,
                right: -50,
                backgroundColor: "#F58D1D",
                width: 30,
                height: 30,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
              }}
              onPress={() => console.log("Add to cart:", item.productId)}
            >
              <Icon name="add-outline" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.productId.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        scrollEnabled={false}
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
    // width: 140,
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
    minWidth: 140,
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
    fontSize: 14,
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
