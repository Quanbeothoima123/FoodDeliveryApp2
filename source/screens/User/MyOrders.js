import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import { supabase } from "../../supabaseHelper/supabase";
import { getUserId } from "../../utils/authHelper";
import { useNavigation } from "@react-navigation/native";
const MyOrdersScreen = () => {
  const fontsLoaded = useCustomFonts();
  const [activeTab, setActiveTab] = useState("Ongoing");
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userId = await getUserId();
        if (!userId) return;

        const { data: orders, error: orderError } = await supabase
          .from("order")
          .select(
            `
            id,
            created_at,
            ship_at,
            total,
            note,
            delivery_address,
            payment_method,
            is_payment,
            status (
              name,
              img
            ),
            orderdetail (
              quantity,
              productid (
                name,
                price,
                img,
                categoryid,
                restaurantid
              )
            )
          `
          )
          .eq("userid", userId)
          .order("created_at", { ascending: false });

        if (orderError) throw orderError;

        const orderMap = new Map();
        const ongoing = [];

        for (const order of orders) {
          for (const [index, detail] of order.orderdetail.entries()) {
            const orderId = order.id;
            const product = detail.productid;
            const statusName = order.status.name;
            const isPayment = order.is_payment;

            // Hàm async để lấy category name
            const getCategoryName = async (categoryId) => {
              const { data, error } = await supabase
                .from("category")
                .select("name")
                .eq("id", categoryId)
                .single();
              if (error) {
                console.log("Fetch category error:", error);
                return "Unknown";
              }
              return data?.name || "Unknown";
            };

            const category = await getCategoryName(product.categoryid);

            const item = {
              id: orderId,
              orderIndex: index + 1,
              image: product.img
                ? { uri: product.img }
                : { uri: "https://via.placeholder.com/60" },
              name: product.name,
              price: `$${product.price.toFixed(2)}`,
              quantity: `${detail.quantity} Items`,
              category,
              time: order.ship_at
                ? new Date(order.ship_at).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "",
              status: statusName,
            };

            if (
              statusName === "Đã hủy" ||
              (statusName === "Chưa thanh toán" && !isPayment)
            ) {
              if (!orderMap.has(orderId)) orderMap.set(orderId, []);
              orderMap.get(orderId).push(item);
            } else {
              ongoing.push(item);
            }
          }
        }

        setOngoingOrders(ongoing);
        setHistoryOrders(Array.from(orderMap.values()).flat());
      } catch (err) {
        console.log("Fetch orders error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderOngoingItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <View style={styles.categoryWrapper}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
      <View style={styles.orderDetails}>
        <Image
          source={item.image}
          style={styles.orderImage}
          defaultSource={{ uri: "https://via.placeholder.com/60" }}
        />
        <View style={styles.orderInfo}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderName}>{item.name}</Text>
            <TouchableOpacity onPress={() => Alert.alert("Order ID", item.id)}>
              <Text style={styles.orderId}>{item.id.slice(-6)}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.priceQuantityContainer}>
            <Text style={styles.orderPrice}>{item.price}</Text>
            <Image
              source={require("../../../assets/images/User/line.png")}
              style={styles.dividerLine}
            />
            <Text style={styles.orderQuantity}>{item.quantity}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.buttonText}>Track Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.buttonTextCancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHistoryItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <View style={styles.categoryRow}>
        <Text style={styles.categoryText}>{item.category}</Text>
        <Text
          style={[
            styles.statusText,
            item.status === "Completed"
              ? styles.statusCompleted
              : styles.statusCancelled,
          ]}
        >
          {item.status}
        </Text>
      </View>
      <View style={styles.orderDetails}>
        <Image
          source={item.image}
          style={styles.orderImage}
          defaultSource={{ uri: "https://via.placeholder.com/60" }}
        />
        <View style={styles.orderInfo}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderName}>{item.name}</Text>
            <TouchableOpacity onPress={() => Alert.alert("Order ID", item.id)}>
              <Text style={styles.orderId}>{item.id.slice(-6)}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.priceTimeQuantityContainer}>
            <Text style={styles.orderPrice}>{item.price}</Text>
            <Image
              source={require("../../../assets/images/User/line.png")}
              style={styles.dividerLine}
            />
            <Text style={styles.orderQuantity}>
              {item.time} • {item.quantity}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.rateButton}>
          <Text style={styles.buttonTextRate}>Rate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reorderButton}>
          <Text style={styles.buttonText}>Re-order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-back" size={24} color="#181C2E" />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Orders</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <FeatherIcon name="more-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Ongoing" && styles.activeTab]}
          onPress={() => setActiveTab("Ongoing")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Ongoing" && styles.activeTabText,
            ]}
          >
            Ongoing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "History" && styles.activeTab]}
          onPress={() => setActiveTab("History")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "History" && styles.activeTabText,
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={activeTab === "Ongoing" ? ongoingOrders : historyOrders}
        renderItem={
          activeTab === "Ongoing" ? renderOngoingItem : renderHistoryItem
        }
        keyExtractor={(item) => item.id + item.orderIndex}
        contentContainerStyle={styles.orderList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontFamily: "Sen",
    fontSize: 17,
    fontWeight: "400",
    marginLeft: 15,
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
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#ff8c00",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Sen",
    color: "#A5A7B9",
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Sen",
    color: "#ff8c00",
  },
  orderList: {
    padding: 10,
    paddingBottom: 20, // Ensure padding at the bottom for scrolling
  },
  orderContainer: {
    marginBottom: 20,
  },
  categoryWrapper: {
    borderColor: "#EEF2F5",
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "Sen",
    fontWeight: "400",
    color: "#000",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Sen",
  },
  statusCompleted: {
    color: "#059C6A",
  },
  statusCancelled: {
    color: "#FF0000",
  },
  orderDetails: {
    flexDirection: "row",
    marginVertical: 10,
  },
  orderImage: {
    width: 60,
    height: 60,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
    marginRight: 10,
  },
  orderInfo: {
    flex: 1,
  },
  orderHeader: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderName: {
    fontSize: 14,
    fontFamily: "Sen",
    fontWeight: "bold",
  },
  orderId: {
    fontSize: 14,
    fontFamily: "Sen",
    color: "#6B6E82",
    textDecorationLine: "underline",
  },
  priceQuantityContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  priceTimeQuantityContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 5,
  },
  orderPrice: {
    fontSize: 14,
    fontFamily: "Sen",
    fontWeight: "bold",
    marginVertical: 5,
  },
  dividerLine: {
    width: 2,
    marginHorizontal: 10,
  },
  orderQuantity: {
    fontFamily: "Sen",
    fontWeight: "400",
    fontSize: 12,
    color: "#6B6E82",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trackButton: {
    flex: 1,
    backgroundColor: "#FF7622",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 5,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#FF7622",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 5,
    width: 140,
  },
  rateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#FF7622",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 5,
  },
  reorderButton: {
    flex: 1,
    backgroundColor: "#FF7622",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  buttonTextCancel: {
    fontFamily: "Sen",
    color: "#FF7622",
    fontSize: 12,
    fontWeight: "900",
  },
  buttonTextRate: {
    fontFamily: "Sen",
    color: "#FF7622",
    fontSize: 12,
    fontWeight: "900",
  },
});

export default MyOrdersScreen;
