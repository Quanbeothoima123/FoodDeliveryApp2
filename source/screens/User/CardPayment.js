import React, { useState, useEffect } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { supabase } from "../../supabaseHelper/supabase";
import CustomButton from "../../components/CustomButton";
import { Alert } from "react-native";

const CartPayment = () => {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [total, setTotal] = useState(0);
  const [cardInfo, setCardInfo] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const { getUserId } = require("../../utils/authHelper");

  // Hàm lấy danh sách thẻ theo payment_method_id
  const fetchCards = async (userid, methodId) => {
    try {
      const query = supabase
        .from("card_payment_info")
        .select(
          "id, payment_method_id, card_holder_name, card_number, expire_date, cvc"
        )
        .eq("userid", userid);
      if (methodId) {
        query.eq("payment_method_id", methodId);
      }
      const { data: cardData, error: cardError } = await query.order("id", {
        ascending: true,
      });

      if (cardError) {
        console.log("Error fetching card info:", cardError);
        return [];
      }
      return cardData;
    } catch (error) {
      console.log("Error fetching cards:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userid = await getUserId();
        if (!userid) {
          navigation.navigate("LoginScreen");
          return;
        }

        // Lấy payment_method
        const { data: methods, error: methodError } = await supabase
          .from("payment_method")
          .select("id, name, img, order_number")
          .order("order_number", { ascending: true });

        if (methodError) {
          console.log("Error fetching payment methods:", methodError);
          return;
        }

        const formattedMethods = methods.map((method) => ({
          id: method.id,
          method: method.name.toLowerCase(),
          image: { uri: method.img || "https://via.placeholder.com/22" },
          name: method.name,
        }));

        setPaymentMethods(formattedMethods);

        // Gán selectedMethod lần đầu hoặc từ route.params
        const initialMethod =
          route.params?.paymentMethodId || formattedMethods[0]?.id || null;
        setSelectedMethod(initialMethod);

        // Lấy thẻ theo selectedMethod
        const cardData = await fetchCards(userid, initialMethod);
        setCardInfo(cardData);
        setSelectedCard(route.params?.newCardId || cardData[0]?.id || null);

        // Lấy total
        const { data: orderData, error: orderError } = await supabase
          .from("order")
          .select("total")
          .eq("id", orderId)
          .single();

        if (orderError) {
          console.log("Error fetching order total:", orderError);
          return;
        }

        setTotal(orderData.total);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [orderId, route.params?.newCardId, route.params?.paymentMethodId]);

  // Cập nhật thẻ khi selectedMethod thay đổi
  useEffect(() => {
    if (!selectedMethod) return;

    const updateCards = async () => {
      const userid = await getUserId();
      if (!userid) return;

      const cardData = await fetchCards(userid, selectedMethod);
      setCardInfo(cardData);
      setSelectedCard(cardData[0]?.id || null);
    };

    updateCards();
  }, [selectedMethod]);

  const handlePayAndConfirm = async () => {
    if (!selectedMethod) {
      Alert.alert("Lỗi", "Vui lòng chọn phương thức thanh toán");
      return;
    }
    const isCash =
      paymentMethods
        .find((m) => m.id === selectedMethod)
        ?.name.toLowerCase() === "cash";
    if (!isCash && cardInfo.length === 0) {
      Alert.alert("Lỗi", "Vui lòng thêm thẻ mới để thanh toán");
      return;
    }
    if (!isCash && cardInfo.length > 0 && !selectedCard) {
      Alert.alert("Lỗi", "Vui lòng chọn một thẻ để thanh toán");
      return;
    }
    try {
      const { data: statusData, error: statusError } = await supabase
        .from("status")
        .select("id")
        .eq("name", "Đang giao")
        .single();
      if (statusError || !statusData) {
        console.log("Error fetching status:", statusError);
        Alert.alert("Lỗi", "Không thể lấy trạng thái đơn hàng");
        return;
      }
      const statusId = statusData.id;

      const { error } = await supabase
        .from("order")
        .update({
          payment_method: selectedMethod,
          is_payment: true,
          status: statusId,
        })
        .eq("id", orderId);

      if (error) {
        console.log("Error updating order:", error);
        Alert.alert("Lỗi", "Không thể hoàn tất thanh toán");
        return;
      }

      Alert.alert("Thành công", "Thanh toán thành công!");
      navigation.navigate("HomeVer1");
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi, vui lòng thử lại");
    }
  };

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
            onPress={() => navigation.goBack()}
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

        {selectedMethod && (
          <View style={styles.cardDetailsContainer}>
            {cardInfo.length > 0 ? (
              cardInfo.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.cardDetailsRow,
                    selectedCard === item.id && { backgroundColor: "#FFEFE8" },
                  ]}
                  onPress={() => setSelectedCard(item.id)}
                >
                  <Image
                    source={
                      paymentMethods.find(
                        (m) => m.id === item.payment_method_id
                      )?.image
                    }
                    style={styles.cardIcon}
                    resizeMode="contain"
                  />
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>
                      {
                        paymentMethods.find(
                          (m) => m.id === item.payment_method_id
                        )?.name
                      }
                    </Text>
                    <Text style={styles.cardNumber}>
                      **** **** **** {item.card_number.slice(-4)}
                    </Text>
                  </View>
                  {selectedCard === item.id && (
                    <Icon name="checkmark-circle" size={16} color="#FF7622" />
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.cardDetailsRow}>
                <Text style={styles.cardNumber}>Không có thẻ thanh toán</Text>
              </View>
            )}
          </View>
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("AddCardScreen", {
              paymentMethodId: selectedMethod,
            })
          }
        >
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
            <Text style={styles.totalText}> ${total}</Text>
          </View>
        </View>

        <CustomButton
          title="PAY & CONFIRM"
          backgroundColor="#FF7622"
          textColor="#FFFFFF"
          onPress={handlePayAndConfirm}
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
    paddingBottom: 100,
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
  cardDetailsContainer: {
    marginVertical: 24,
    backgroundColor: "#F4F5F7",
    borderRadius: 10,
  },
  cardDetailsRow: {
    height: 82,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardIcon: {
    width: 28,
    height: 18,
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontFamily: "Sen",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardNumber: {
    fontFamily: "Sen",
    fontSize: 14,
    color: "#A1A1A1",
    marginTop: 4,
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
    marginBottom: 16,
  },
  totalText: {
    fontFamily: "Sen",
    fontSize: 30,
    fontWeight: "bold",
    color: "#121223",
  },
});

export default CartPayment;
