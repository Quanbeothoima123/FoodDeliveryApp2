import React, { useState } from "react";
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
import CustomButton from "../../components/CustomButton";

const foodData = {
  id: 1,
  nameFood: "Pizza Calzone European",
  imgFood: require("../../../assets/images/User/burger1.jpg"),
  nameRestaurant: "Utora Coffee House",
  description:
    "Prosciutto e funghi is a pizza variety that is topped with tomato sauce.",
  starRate: 4.7,
  feeShip: "Free",
  timeShip: "20 min",
  sizeofFood: ['10"', '14"', '16"'],
  ingredients: "salt, garlic, tor, chicken_drumstick, chili",
  price: 32,
};

const ingredientImages = {
  salt: require("../../../assets/images/User/salt.png"),
  garlic: require("../../../assets/images/User/garlic.png"),
  tor: require("../../../assets/images/User/tor.png"),
  chicken_drumstick: require("../../../assets/images/User/chicken_drumstick.png"),
  chili: require("../../../assets/images/User/chili.png"),
  default: require("../../../assets/images/User/ingredient-placeholder.png"),
};

const FoodDetailScreen = () => {
  const fontsLoaded = useCustomFonts();
  const [quantity, setQuantity] = useState(2);
  const ingredientsArray = foodData.ingredients
    .split(", ")
    .map((item, index) => ({ id: index.toString(), name: item }));

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const renderIngredient = ({ item }) => {
    const ingredientImage =
      ingredientImages[item.name] || ingredientImages.default;
    return (
      <View style={styles.ingredientItem}>
        <Image source={ingredientImage} style={styles.ingredientImage} />
      </View>
    );
  };

  const [selectedSize, setSelectedSize] = useState(foodData.sizeofFood[0]);
  if (!fontsLoaded) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => console.log("Go back")}
        >
          <Icon name="chevron-back" size={24} color="#181C2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={foodData.imgFood} style={styles.foodImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Icon name="heart-outline" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.restaurantContainer}>
          <Image source={require("../../../assets/images/User/uttora.png")} />
          <Text style={styles.restaurantName}>{foodData.nameRestaurant}</Text>
        </View>

        <Text style={styles.foodName}>{foodData.nameFood}</Text>
        <Text style={styles.description}>{foodData.description}</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Icon name="star" size={16} color="#FF7622" />
            <Text style={styles.detailTextStar}>{foodData.starRate}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="bicycle" size={16} color="#FF7622" />
            <Text style={styles.detailText}>{foodData.feeShip}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="time-outline" size={16} color="#FF7622" />
            <Text style={styles.detailText}>{foodData.timeShip}</Text>
          </View>
        </View>

        <View style={styles.sizeRow}>
          <Text style={styles.sectionTitle}>SIZE:</Text>
          <View style={styles.sizeContainer}>
            {foodData.sizeofFood.map((size, index) => (
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
          <Text style={styles.price}>${foodData.price}</Text>
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
    width: 48,
    height: 48,
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
