import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import { useNavigation, useRoute } from "@react-navigation/native";
import { supabase } from "../../supabaseHelper/supabase";
import CustomButton from "../../components/CustomButton";
import { Alert } from "react-native";

const AddCardScreen = () => {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();
  const route = useRoute();
  const { paymentMethodId } = route.params; // Nhận payment_method_id từ CartPayment
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const { getUserId } = require("../../utils/authHelper");

  const handleCardNumberChange = (text) => {
    const digits = text.replace(/\D/g, "").substring(0, 16);
    const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  const handleExpiryDateChange = (text) => {
    let digits = text.replace(/\D/g, "").substring(0, 6);
    if (digits.length < 2) {
      setExpiryDate(digits);
      return;
    }
    let month = parseInt(digits.substring(0, 2), 10);
    if (month > 12) month = 12;
    else if (month < 1) month = 1;
    const monthStr = month.toString().padStart(2, "0");
    let year = digits.substring(2, 6);
    const currentYear = 2025;
    const maxYear = 2030;
    if (year.length === 4) {
      const yearNum = parseInt(year, 10);
      if (yearNum < currentYear) year = currentYear.toString();
      else if (yearNum > maxYear) year = maxYear.toString();
    }
    const formatted = year ? `${monthStr}/${year}` : `${monthStr}/`;
    setExpiryDate(formatted);
  };

  const handleAddAndMakePayment = async () => {
    if (!cardHolderName || !cardNumber || !expiryDate || !cvc) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin thẻ");
      return;
    }
    if (!paymentMethodId) {
      Alert.alert("Lỗi", "Phương thức thanh toán không hợp lệ");
      return;
    }
    try {
      const userid = await getUserId();
      if (!userid) {
        navigation.navigate("LoginScreen");
        return;
      }
      const { data: newCard, error } = await supabase
        .from("card_payment_info")
        .insert([
          {
            userid,
            payment_method_id: paymentMethodId,
            card_holder_name: cardHolderName,
            card_number: cardNumber.replace(/\s/g, ""),
            expire_date: expiryDate,
            cvc,
          },
        ])
        .select("id")
        .single();
      if (error) {
        console.log("Error adding card:", error);
        Alert.alert("Lỗi", "Không thể thêm thẻ");
        return;
      }
      Alert.alert("Thành công", "Thẻ đã được thêm!");
      navigation.navigate("Payment", {
        orderId: route.params.orderId,
        newCardId: newCard.id, // Truyền ID thẻ mới
      });
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi, vui lòng thử lại");
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={24} color="#181C2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Card</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>CARD HOLDER NAME</Text>
        <TextInput
          style={styles.input}
          value={cardHolderName}
          onChangeText={setCardHolderName}
          placeholder="Enter cardholder name"
        />

        <Text style={styles.label}>CARD NUMBER</Text>
        <TextInput
          style={styles.input}
          value={cardNumber}
          onChangeText={handleCardNumberChange}
          placeholder="**** **** **** ****"
          keyboardType="numeric"
          maxLength={19}
        />

        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>EXPIRE DATE</Text>
            <TextInput
              style={[styles.input, styles.halfInput]}
              value={expiryDate}
              onChangeText={handleExpiryDateChange}
              placeholder="mm/yyyy"
              keyboardType="numeric"
              maxLength={7}
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>CVC</Text>
            <TextInput
              style={[styles.input, styles.halfInput]}
              value={cvc}
              onChangeText={setCvc}
              placeholder="***"
              keyboardType="numeric"
              maxLength={3}
              secureTextEntry
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="ADD & MAKE PAYMENT"
          backgroundColor="#FF7622"
          textColor="#FFFFFF"
          onPress={handleAddAndMakePayment}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
  },
  closeButton: {
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
  formContainer: {
    flex: 1,
  },
  label: {
    fontFamily: "Sen",
    fontSize: 14,
    fontWeight: "400",
    color: "#A0A5BA",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F0F5FA",
    borderRadius: 8,
    padding: 12,
    fontFamily: "Sen",
    fontSize: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  halfInput: {
    width: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
  },
});

export default AddCardScreen;
