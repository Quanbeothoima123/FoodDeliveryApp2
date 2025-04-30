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
import CustomButton from "../../components/CustomButton";

const AddCardScreen = () => {
  const fontsLoaded = useCustomFonts();
  const [cardHolderName, setCardHolderName] = useState("Vishal Khadok");
  const [cardNumber, setCardNumber] = useState(""); // sửa từ "214" về ""
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  // Format hiển thị card number
  const formatCardNumberForDisplay = (value) => {
    const digits = value.replace(/\D/g, "").substring(0, 16);
    const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
    const remaining = 16 - digits.length;
    const underscores = "_ ".repeat(remaining).trim();
    return formatted + (remaining > 0 ? " " + underscores : "");
  };

  // Hàm format để hiển thị: "1234 5678 ____ ____"
  const formatCardNumberWithUnderscore = (raw) => {
    const digits = raw.replace(/\D/g, "").substring(0, 16);
    let display = "";

    for (let i = 0; i < 16; i++) {
      if (i < digits.length) {
        display += digits[i];
      } else {
        display += "_";
      }

      if ((i + 1) % 4 === 0 && i !== 15) {
        display += " ";
      }
    }

    return display;
  };
  const handleCardNumberChange = (text) => {
    // Chỉ lấy số
    const digits = text.replace(/\D/g, "").substring(0, 16);

    // Format thành nhóm 4 số
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

    if (month > 12) {
      month = 12;
    } else if (month < 1) {
      month = 1;
    }

    const monthStr = month.toString().padStart(2, "0");
    let year = digits.substring(2, 6);
    const currentYear = 2025;
    const maxYear = 2030;

    if (year.length === 4) {
      const yearNum = parseInt(year, 10);
      if (yearNum < currentYear) {
        year = currentYear.toString();
      } else if (yearNum > maxYear) {
        year = maxYear.toString();
      }
    }

    const formatted = year ? `${monthStr}/${year}` : `${monthStr}/`;
    setExpiryDate(formatted);
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => console.log("Close")}
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
          maxLength={19} // 16 số + 3 khoảng trắng
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
          onPress={() => console.log("Add and make payment")}
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
