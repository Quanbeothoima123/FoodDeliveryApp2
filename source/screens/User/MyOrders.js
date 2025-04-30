import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useCustomFonts } from "../../hooks/useCustomFonts";

// Placeholder images (replace with actual image paths)
const pizzaHutImage = require("../../../assets/images/User/pizaaHut.jpg");
const mcdonaldImage = require("../../../assets/images/User/mcdonald.jpg");
const starbucksImage = require("../../../assets/images/User/starBuck.jpg");

const ongoingOrders = [
  {
    id: "#162432",
    image: pizzaHutImage,
    name: "Pizza Hut",
    price: "$35.25",
    quantity: "03 Items",
    category: "Food",
  },
  {
    id: "#242432",
    image: mcdonaldImage,
    name: "McDonald",
    price: "$40.15",
    quantity: "02 Items",
    category: "Drink",
  },
  {
    id: "#240112",
    image: starbucksImage,
    name: "Starbucks",
    price: "$10.20",
    quantity: "01 Items",
    category: "Drink",
  },
];

const historyOrders = [
  {
    id: "#162432",
    image: pizzaHutImage,
    name: "Pizza Hut",
    price: "$35.25",
    time: "29 JAN, 12:30",
    quantity: "03 Items",
    category: "Food",
    status: "Completed",
  },
  {
    id: "#242432",
    image: mcdonaldImage,
    name: "McDonald",
    price: "$40.15",
    time: "30 JAN, 12:30",
    quantity: "02 Items",
    category: "Drink",
    status: "Completed",
  },
  {
    id: "#240112",
    image: starbucksImage,
    name: "Starbucks",
    price: "$10.20",
    time: "30 JAN, 12:30",
    quantity: "01 Items",
    category: "Drink",
    status: "Cancelled",
  },
];

const MyOrdersScreen = () => {
  const fontsLoaded = useCustomFonts();
  const [activeTab, setActiveTab] = useState("Ongoing");

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
            <Text style={styles.orderId}>{item.id}</Text>
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
            <Text style={styles.orderId}>{item.id}</Text>
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

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => console.log("Go back")}
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
        keyExtractor={(item) => item.id}
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
