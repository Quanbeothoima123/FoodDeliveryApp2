import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import { supabase } from "../../supabaseHelper/supabase";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";

const FoodDetailScreen = () => {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();
  const route = useRoute();
  const productId = route.params?.productId; // Nhận productId từ FoodScreen
  const [product, setProduct] = useState(null);
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [quantity, setQuantity] = useState(2);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data: productData, error: productError } = await supabase
        .from("product")
        .select(
          "*, restaurant(id, name, img, description, starrating, feeship, timeship, category, more_image)"
        )
        .eq("id", productId)
        .single();

      if (productError || !productData) {
        console.log("Error fetching product:", productError);
        return;
      }

      const { data: ingredientsData, error: ingredientsError } = await supabase
        .from("ingredients")
        .select("name, image")
        .in("name", productData.ingredients || []);

      if (ingredientsError) {
        console.log("Error fetching ingredients:", ingredientsError);
      }

      setProduct({
        id: productData.id,
        nameFood: productData.name,
        imgFood: productData.img,
        nameRestaurant: productData.restaurant.name,
        restaurantId: productData.restaurant.id, // Thêm restaurantId
        restaurantImage: productData.restaurant.img,
        description: productData.restaurant.description,
        starRate: productData.starrating || productData.restaurant.starrating,
        feeShip:
          productData.restaurant.feeship === 0
            ? "Free"
            : productData.restaurant.feeship,
        timeShip: productData.restaurant.timeship,
        sizeofFood: productData.size || [],
        ingredients: productData.ingredients || [],
        price: productData.price,
        category: productData.restaurant.category || [], // Thêm category
        more_image: productData.restaurant.more_image || [], // Thêm more_image
      });

      setIngredientsArray(
        (productData.ingredients || []).map((item, index) => ({
          id: index.toString(),
          name: item,
          image:
            ingredientsData?.find((ing) => ing.name === item)?.image ||
            "https://via.placeholder.com/50",
        }))
      );
    };

    if (productId) fetchProduct();
  }, [productId]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const renderIngredient = ({ item }) => (
    <View style={styles.ingredientItem}>
      <Image source={{ uri: item.image }} style={styles.ingredientImage} />
    </View>
  );

  const [selectedSize, setSelectedSize] = useState(
    product?.sizeofFood?.[0] || '10"'
  );

  if (!fontsLoaded || !product) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#181C2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: product.imgFood }} style={styles.foodImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Icon name="heart-outline" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <TouchableOpacity
          style={styles.restaurantContainer}
          onPress={() =>
            navigation.navigate("RestaurantScreen", {
              restaurant: {
                id: product.restaurantId, // Thêm restaurantId vào product
                nameRestaurant: product.nameRestaurant,
                image: product.restaurantImage,
                description: product.description,
                category: product.category || [], // Nếu có category
                starRate: product.starRate,
                feeShip: product.feeShip,
                timeShipping: product.timeShip,
                more_image: product.more_image || [], // Nếu có more_image
              },
            })
          }
        >
          <Image
            source={require("../../../assets/images/User/restaurant_icon.png")}
            style={{ width: 24, height: 24 }}
          />
          <Text style={styles.restaurantName}>{product.nameRestaurant}</Text>
        </TouchableOpacity>

        <Text style={styles.foodName}>{product.nameFood}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Icon name="star" size={16} color="#FF7622" />
            <Text style={styles.detailTextStar}>{product.starRate}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="bicycle" size={16} color="#FF7622" />
            <Text style={styles.detailText}>{product.feeShip}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="time-outline" size={16} color="#FF7622" />
            <Text style={styles.detailText}>{product.timeShip}</Text>
          </View>
        </View>

        <View style={styles.sizeRow}>
          <Text style={styles.sectionTitle}>SIZE:</Text>
          <View style={styles.sizeContainer}>
            {product.sizeofFood.map((size, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedSize(size)}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton,
                ]}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.selectedSizeText,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>INGREDIENTS</Text>
        <FlatList
          data={ingredientsArray}
          renderItem={renderIngredient}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ingredientsList}
        />
      </View>

      <View style={styles.bottomWrapper}>
        <View style={styles.bottomBar}>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={decreaseQuantity}
            >
              <Icon name="remove" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={increaseQuantity}
            >
              <Icon name="add" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton
            title="Next"
            backgroundColor="#FF7622"
            textColor="#FFFFFF"
            onPress={() => console.log("Next")}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    paddingLeft: 20,
    alignItems: "center",
  },
  headerTitle: {
    marginLeft: 20,
    fontSize: 17,
    fontFamily: "Sen",
    fontWeight: "400",
    color: "#181C2E",
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
  imageContainer: {
    position: "relative",
    alignItems: "center",
    backgroundColor: "#FFDAB9",
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 20,
    height: 200,
  },
  foodImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  favoriteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 5,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flex: 1,
  },
  restaurantContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 200,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    borderRadius: 30,
    height: 47,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 14,
    color: "#181C2E",
    fontWeight: "400",
    fontFamily: "Sen",
    marginLeft: 10,
  },
  foodName: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Sen",
    color: "#181C2E",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#A0A5BA",
    fontFamily: "Sen",
    fontWeight: "400",
    marginBottom: 15,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailTextStar: {
    fontSize: 16,
    fontFamily: "Sen",
    color: "#181C2E",
    fontWeight: "bold",
    marginLeft: 5,
  },
  detailText: {
    fontSize: 14,
    fontFamily: "Sen",
    color: "#181C2E",
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#181C2E",
    marginBottom: 10,
    marginRight: 20,
  },
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  sizeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  sizeButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#F0F5FA",
    borderRadius: 24,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedSizeButton: {
    backgroundColor: "#ED891C",
  },
  sizeText: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Sen",
    color: "#181C2E",
  },
  selectedSizeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  ingredientsList: {
    paddingVertical: 10,
  },
  ingredientItem: {
    width: 50,
    height: 50,
    backgroundColor: "#FFEBE4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderRadius: 25,
  },
  ingredientImage: {
    width: 30,
    height: 30,
  },
  bottomWrapper: {
    marginBottom: 40,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontFamily: "Sen",
    fontWeight: "bold",
    color: "#181C2E",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ED891C",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Sen",
    marginHorizontal: 10,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    backgroundColor: "#F0F5FA",
  },
});

export default FoodDetailScreen;
