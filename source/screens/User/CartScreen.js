import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useCustomFonts } from "../../hooks/useCustomFonts";

const CartScreen = () => {
  const fontsLoaded = useCustomFonts();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState("2118 Thornridge Cir. Syracuse");
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: require("../../../assets/images/User/buffalo-pizza.jpg"),
      name: "Pizza Calzone",
      price: 64,
      size: '14"',
      quantity: 2,
    },
    {
      id: 2,
      image: require("../../../assets/images/User/burger4.jpg"),
      name: "Pizza Calzone",
      price: 32,
      size: '14"',
      quantity: 1,
    },
  ]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.BackAndTitile}>
            <TouchableOpacity style={styles.Backbutton}>
              <Icon name="chevron-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Cart</Text>
          </View>

          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Text
              style={[
                styles.editText,
                { color: isEditing ? "#059C6A" : "#FF7622" },
              ]}
            >
              {isEditing ? "DONE" : "EDIT ITEMS"}
            </Text>
          </TouchableOpacity>
        </View>

        {cartItems.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemType}>Pansi restaurant</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <View style={styles.sizeAndQuantity}>
                <Text style={styles.itemSize}>{item.size}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={{
                      width: 22,
                      height: 22,
                      backgroundColor: "#41414F",
                      borderRadius: 11,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => handleQuantityChange(item.id, -1)}
                  >
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={{
                      width: 22,
                      height: 22,
                      backgroundColor: "#41414F",
                      borderRadius: 11,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => handleQuantityChange(item.id, 1)}
                  >
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {isEditing && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(item.id)}
              >
                <Text style={styles.removeText}>X</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.sectionTitle}>DELIVERY ADDRESS</Text>
          <TouchableOpacity
            onPress={() => setIsEditingAddress(!isEditingAddress)}
          >
            <Text
              style={[
                styles.editText,
                { color: isEditingAddress ? "#059C6A" : "#FF7622" },
              ]}
            >
              {isEditingAddress ? "DONE" : "EDIT"}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.addressInput}
          value={address}
          onChangeText={setAddress}
          editable={isEditingAddress}
        />

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>TOTAL: ${totalPrice}</Text>
          <TouchableOpacity>
            <Text style={styles.breakdownText}>Breakdown</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.placeOrderButton}>
          <Text style={styles.placeOrderText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121223",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Sen",
    fontWeight: "400",
    marginLeft: 20,
  },
  BackAndTitile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  Backbutton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#292939",
  },
  editText: {
    fontFamily: "Sen",
    fontSize: 14,
    fontWeight: "400",
    textDecorationLine: "underline",
  },
  itemContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 12,
  },
  itemImage: {
    width: 136,
    height: 117,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontFamily: "Sen",
    fontSize: 18,
    fontWeight: "400",
    color: "#ffffff",
  },
  itemType: {
    color: "#A1A1A1",
    fontSize: 12,
    marginVertical: 4,
  },
  itemPrice: {
    fontFamily: "Sen",
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  sizeAndQuantity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 12,
  },
  itemSize: {
    fontFamily: "Sen",
    fontWeight: "400",
    color: "#898991",
    fontSize: 18,
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    fontFamily: "Sen",
    color: "#ffffff",
    fontSize: 16,
  },
  quantity: {
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 12,
  },
  removeButton: {
    backgroundColor: "#E04444",
    borderRadius: 13,
    width: 27,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 5,
    top: 10,
  },
  removeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 16,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: "#121223",
    fontSize: 14,
    fontWeight: "600",
  },
  addressInput: {
    backgroundColor: "#F5F5F5",
    color: "#A1A1A1",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  totalText: {
    color: "#121223",
    fontSize: 18,
    fontWeight: "bold",
  },
  breakdownText: {
    color: "#FF7622",
    fontSize: 14,
  },
  placeOrderButton: {
    backgroundColor: "#FF7622",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  placeOrderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
