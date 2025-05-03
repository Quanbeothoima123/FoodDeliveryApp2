import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import { getUserId } from "../../utils/authHelper";
import { supabase } from "../../supabaseHelper/supabase";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../utils/CartContext"; // Kiểm tra nếu là "../../CartContext"

const CartScreen = () => {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();
  const { fetchCartCount } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState(""); // Bỏ hardcode
  const [cartItems, setCartItems] = useState([]);

  // Tải dữ liệu giỏ hàng từ Supabase
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userid = await getUserId();
        if (!userid) {
          navigation.navigate("LoginScreen");
          return;
        }

        const { data, error } = await supabase
          .from("cart")
          .select(
            "quantity, product(id, name, price, img, size, restaurant(name))"
          )
          .eq("userid", userid);

        if (error) {
          console.log("Error fetching cart items:", error);
          return;
        }

        const formattedItems = data.map((item, index) => ({
          id: index + 1,
          productId: item.product.id,
          image: { uri: item.product.img || "https://via.placeholder.com/100" },
          name: item.product.name,
          price: item.product.price,
          size: item.product.size?.[0] || '10"',
          quantity: item.quantity,
          restaurant: item.product.restaurant.name,
        }));

        setCartItems(formattedItems);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Xử lý thay đổi số lượng
  const handleQuantityChange = async (id, delta) => {
    const item = cartItems.find((item) => item.id === id);
    const newQuantity = Math.max(0, item.quantity + delta);

    if (newQuantity === 0) {
      handleRemoveItem(id);
      return;
    }

    try {
      const userid = await getUserId();
      if (!userid) {
        navigation.navigate("LoginScreen");
        return;
      }

      const { error } = await supabase
        .from("cart")
        .update({ quantity: newQuantity })
        .eq("userid", userid)
        .eq("productid", item.productId);

      if (error) {
        console.log("Error updating quantity:", error);
        return;
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );

      const count = await fetchCartCount(userid);
      console.log("Updated cart count after quantity change:", count);

      Alert.alert("Thành công", `Đã cập nhật số lượng: ${newQuantity}`);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Xử lý xóa sản phẩm
  const handleRemoveItem = async (id) => {
    const item = cartItems.find((item) => item.id === id);

    try {
      const userid = await getUserId();
      if (!userid) {
        navigation.navigate("LoginScreen");
        return;
      }

      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("userid", userid)
        .eq("productid", item.productId);

      if (error) {
        console.log("Error removing item:", error);
        return;
      }

      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

      const count = await fetchCartCount(userid);
      console.log("Updated cart count after remove:", count);

      Alert.alert("Thành công", "Đã xóa sản phẩm khỏi giỏ hàng");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Xử lý đặt hàng
  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert(
        "Lỗi",
        "Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng."
      );
      return;
    }
    if (!address.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập địa chỉ giao hàng");
      return;
    }
    try {
      const userid = await getUserId();
      if (!userid) {
        navigation.navigate("LoginScreen");
        return;
      }
      // Lấy ID trạng thái "Chuẩn bị đơn hàng"
      const { data: statusData, error: statusError } = await supabase
        .from("status")
        .select("id")
        .eq("name", "Chuẩn bị đơn hàng")
        .single();
      if (statusError || !statusData) {
        console.log("Error fetching status:", statusError);
        Alert.alert("Lỗi", "Không thể lấy trạng thái đơn hàng");
        return;
      }
      const statusId = statusData.id;
      const { data: orderData, error: orderError } = await supabase
        .from("order")
        .insert([
          {
            userid,
            total: totalPrice,
            delivery_address: address,
            payment_method: null,
            is_payment: false,
            status: statusId, // Thêm status
          },
        ])
        .select("id")
        .single();
      if (orderError) {
        console.log("Error creating order:", orderError);
        Alert.alert("Lỗi", "Không thể tạo đơn hàng");
        return;
      }
      const orderId = orderData.id;
      const orderDetails = cartItems.map((item) => ({
        orderid: orderId,
        productid: item.productId,
        quantity: item.quantity,
      }));
      const { error: detailError } = await supabase
        .from("orderdetail")
        .insert(orderDetails);
      if (detailError) {
        console.log("Error creating order details:", detailError);
        Alert.alert("Lỗi", "Không thể lưu chi tiết đơn hàng");
        return;
      }
      const { error: clearCartError } = await supabase
        .from("cart")
        .delete()
        .eq("userid", userid);
      if (clearCartError) {
        console.log("Error clearing cart:", clearCartError);
        Alert.alert("Lỗi", "Không thể xóa giỏ hàng");
        return;
      }
      setCartItems([]);
      await fetchCartCount(userid);
      navigation.navigate("Payment", { orderId });
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi, vui lòng thử lại");
    }
  };

  // Tính tổng giá
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Hàm render item cho FlatList
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemType}>{item.restaurant}</Text>
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
              activeOpacity={0.7}
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
              activeOpacity={0.7}
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
          activeOpacity={0.7}
        >
          <Text style={styles.removeText}>X</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // Header cho FlatList
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.BackAndTitile}>
        <TouchableOpacity
          style={styles.Backbutton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="chevron-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
      </View>
      <TouchableOpacity
        onPress={() => setIsEditing(!isEditing)}
        activeOpacity={0.7}
      >
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
  );

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 220 }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.sectionTitle}>DELIVERY ADDRESS</Text>
          <TouchableOpacity
            onPress={() => setIsEditingAddress(!isEditingAddress)}
            activeOpacity={0.7}
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
          placeholder="Nhập địa chỉ giao hàng"
          placeholderTextColor="#A1A1A1"
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>TOTAL: ${totalPrice}</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.breakdownText}>Breakdown</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          activeOpacity={0.7}
        >
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
    color: "#333333",
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
