import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import { supabase } from "../../supabaseHelper/supabase";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUserId } from "../../utils/authHelper";
import { useCart } from "../../utils/CartContext";
const FoodScreen = () => {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();
  const route = useRoute();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    route.params?.category || "Burger"
  );
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const { fetchCartCount } = useCart();
  useEffect(() => {
    const fetchData = async () => {
      // Lấy danh mục
      const { data: catData, error: catDataError } = await supabase
        .from("category")
        .select("*")
        .order("order", { ascending: true });
      if (catDataError) {
        console.log("Error fetching categories:", catDataError);
        return;
      }
      setCategories(catData);

      // Lấy categoryid tương ứng với selectedCategory
      let categoryId = null;
      let prodQuery = supabase
        .from("product")
        .select("*, category(name), restaurant(name)");

      if (selectedCategory !== "All") {
        const { data: categoryData, error: catError } = await supabase
          .from("category")
          .select("id")
          .ilike("name", selectedCategory) // Bỏ qua hoa thường
          .single();

        if (catError || !categoryData) {
          console.log(
            "Error fetching category or category not found:",
            catError
          );
          setProducts([]);
          setRestaurants([]);
          return;
        }

        categoryId = categoryData.id;
        prodQuery = prodQuery.eq("categoryid", categoryId);
      }

      const { data: prodData, error: prodError } = await prodQuery;
      if (prodError) {
        console.log("Error fetching products:", prodError);
        setProducts([]);
        setRestaurants([]);
        return;
      }
      setProducts(
        prodData?.map((prod) => ({
          burgerId: prod.id,
          burgerName: prod.name,
          restaurantName: prod.restaurant.name,
          price: prod.price,
          imageUrl: prod.img,
        })) || []
      );

      // Lấy danh sách restaurantid từ sản phẩm đã lọc
      const restaurantIds = prodData?.map((prod) => prod.restaurantid) || [];

      // Lấy nhà hàng
      let resData = [];
      if (restaurantIds.length > 0) {
        const { data, error: resError } = await supabase
          .from("restaurant")
          .select("*")
          .in("id", restaurantIds);
        if (resError) {
          console.log("Error fetching restaurants:", resError);
        } else {
          resData = data || [];
        }
      }
      setRestaurants(
        resData.map((res) => ({
          id: res.id,
          nameRestaurant: res.name,
          image: res.img,
          description: res.description,
          category: res.category, // Giữ nguyên mảng
          starRate: res.starrating,
          feeShip: res.feeship === 0 ? "Free" : res.feeship,
          timeShipping: res.timeship,
          more_image: res.more_image || [], // Thêm more_image
        }))
      );
    };
    fetchData();
  }, [selectedCategory]);

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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
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
            <ScrollView
              style={styles.dropdownMenu}
              nestedScrollEnabled={true} // Cho phép cuộn độc lập
              showsVerticalScrollIndicator={false}
            >
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
            </ScrollView>
          )}
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <FeatherIcon name="sliders" size={20} color="#181C2E" />
        </TouchableOpacity>
      </View>

      {/* Popular Items */}
      <Text style={styles.sectionTitle}>Popular {selectedCategory}</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.burgerItem}
            onPress={() =>
              navigation.navigate("FoodDetail", { productId: item.burgerId })
            }
          >
            <View
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
                <Text style={styles.burgerName}>{item.burgerName}</Text>
                <Text
                  style={styles.restaurantNamePop}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
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
                    onPress={async () => {
                      try {
                        const userid = await getUserId();
                        if (!userid) {
                          navigation.navigate("LoginScreen");
                          return;
                        }

                        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
                        const { data: existingItem, error: fetchError } =
                          await supabase
                            .from("cart")
                            .select("id, quantity")
                            .eq("userid", userid)
                            .eq("productid", item.burgerId)
                            .single();

                        if (fetchError && fetchError.code !== "PGRST116") {
                          // PGRST116 là lỗi "không tìm thấy bản ghi"
                          console.log("Error checking cart:", fetchError);
                          return;
                        }

                        if (existingItem) {
                          // Nếu sản phẩm đã có, tăng quantity
                          const newQuantity = existingItem.quantity + 1;
                          const { error: updateError } = await supabase
                            .from("cart")
                            .update({ quantity: newQuantity })
                            .eq("id", existingItem.id);

                          if (updateError) {
                            console.log(
                              "Error updating quantity:",
                              updateError
                            );
                            return;
                          }
                        } else {
                          // Nếu sản phẩm chưa có, thêm mới
                          const { error: insertError } = await supabase
                            .from("cart")
                            .insert([
                              {
                                userid,
                                productid: item.burgerId,
                                quantity: 1,
                              },
                            ]);

                          if (insertError) {
                            console.log("Error adding to cart:", insertError);
                            return;
                          }
                        }

                        // Cập nhật badgeCount
                        const count = await fetchCartCount(userid);
                        console.log("Updated cart count after add:", count);

                        // Hiển thị thông báo
                        Alert.alert("Thành công", "Đã thêm vào giỏ hàng!");
                      } catch (error) {
                        console.log("Error:", error);
                      }
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

      {/* Open Restaurants */}
      <Text style={styles.sectionTitle}>Open Restaurants</Text>
      {restaurants.map((restaurant) => (
        <TouchableOpacity
          key={restaurant.id}
          style={styles.restaurantItem}
          onPress={() =>
            navigation.navigate("RestaurantScreen", { restaurant })
          }
        >
          <Image
            source={{ uri: restaurant.image }}
            style={styles.restaurantImage}
          />
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
    minWidth: 100,
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
    minHeight: 190,
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
    minHeight: 130,
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
