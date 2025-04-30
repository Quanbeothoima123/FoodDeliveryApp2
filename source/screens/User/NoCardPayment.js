import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import CustomButton from "../../components/CustomButton";
const NoPaymentScreen = () => {
  const fontsLoaded = useCustomFonts();
  const [selectedMethod, setSelectedMethod] = useState(3); // Default selected method (Mastercard)

  const paymentMethods = [
    {
      id: 1,
      method: "cash",
      image: require("../../../assets/images/User/cash.png"),
      name: "Cash",
    },
    {
      id: 2,
      method: "visa",
      image: require("../../../assets/images/User/visa2.png"),
      name: "Visa",
    },
    {
      id: 3,
      method: "mastercard",
      image: require("../../../assets/images/User/master.png"),
      name: "Mastercard",
    },
    {
      id: 4,
      method: "paypal",
      image: require("../../../assets/images/User/paypal.png"),
      name: "PayPal",
    },
  ];

  const renderPaymentMethod = ({ item }) => (
    <View style={styles.methodWrapper}>
      <TouchableOpacity
        style={[
          styles.methodContainer,
          selectedMethod === item.id && styles.selectedMethod,
        ]}
        onPress={() => setSelectedMethod(item.id)}
      >
        <Image
          source={item.image}
          style={styles.methodImage}
          resizeMode="contain"
        />
        {selectedMethod === item.id && (
          <Image
            source={require("../../../assets/images/User/tick.png")}
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.methodName}>{item.name}</Text>
    </View>
  );

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.HeaderButton}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => console.log("Go back")}
          >
            <Icon name="chevron-back" size={24} color="#181C2E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
        </View>
        <View>
          <FlatList
            data={paymentMethods}
            renderItem={renderPaymentMethod}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </View>

        <View style={styles.cardContainer}>
          <Image
            source={require("../../../assets/images/User/masterBig.png")}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardTitle}>No master card added</Text>
          <Text style={styles.cardSubtitle}>
            You can add a mastercard and save it for later
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ ADD NEW</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Sen",
                fontSize: 14,
                fontWeight: "400",
                color: "#A0A5BA",
              }}
            >
              TOTAL:
            </Text>
            <Text style={styles.totalText}> $96</Text>
          </View>
        </View>

        <CustomButton
          title="PAY & CONFIRM"
          backgroundColor="#FF7622"
          textColor="#FFFFFF"
          onPress={() => console.log("Next")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingBottom: 100, // Extra padding to ensure content is not hidden under bottom container
  },
  HeaderButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
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
  headerTitle: {
    fontFamily: "Sen",
    fontSize: 17,
    fontWeight: "400",
    marginLeft: 20,
  },
  flatListContent: {
    paddingVertical: 8,
  },
  methodWrapper: {
    alignItems: "center",
    marginRight: 12,
    width: 85,
    height: 93,
  },
  methodContainer: {
    width: 85,
    height: 72,
    backgroundColor: "#F0F5FA",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedMethod: {
    backgroundColor: "#FFEFE8",
    borderWidth: 1,
    borderColor: "#FF7622",
  },
  methodImage: {
    width: 22,
    height: 22,
  },
  methodName: {
    fontFamily: "Sen",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 8,
  },
  checkIcon: {
    width: 16,
    height: 16,
    position: "absolute",
    top: 8,
    right: 8,
  },
  cardContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginVertical: 24,
  },
  cardImage: {
    width: 120,
    height: 80,
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: "Sen",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardSubtitle: {
    fontFamily: "Sen",
    fontSize: 15,
    color: "#A1A1A1",
    textAlign: "center",
    marginBottom: 16,
  },
  addButton: {
    borderWidth: 1,
    borderColor: "#F0F5FA",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 62,
  },
  addButtonText: {
    fontFamily: "Sen",
    fontSize: 14,
    color: "#FF7622",
    fontWeight: "bold",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: "#fff",
  },
  totalContainer: {
    // alignItems: "center",
    marginBottom: 16,
  },
  totalText: {
    fontFamily: "Sen",
    fontSize: 30,
    fontWeight: "bold",
    color: "#121223",
  },
  payButton: {
    backgroundColor: "#FF7622",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  payButtonText: {
    fontFamily: "Sen",
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default NoPaymentScreen;
