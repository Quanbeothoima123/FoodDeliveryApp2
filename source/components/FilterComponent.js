import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const FilterComponent = ({ visible, onClose }) => {
  const [selectedOffer, setSelectedOffer] = useState("Delivery");
  const [selectedTime, setSelectedTime] = useState("10-15 min");
  const [selectedPrice, setSelectedPrice] = useState("$");
  const [selectedRating, setSelectedRating] = useState(4);

  const offers = ["Delivery", "Pick Up", "Offer"];
  const times = ["10-15 min", "20 min", "30 min"];
  const prices = ["$", "$$", "$$$"];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Filter your search</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Offers Section */}
            <Text style={styles.sectionTitle}>OFFERS</Text>
            <View style={styles.buttonGroup}>
              {offers.map((offer) => (
                <TouchableOpacity
                  key={offer}
                  style={[
                    styles.optionButton,
                    selectedOffer === offer && styles.selectedButton,
                  ]}
                  onPress={() => setSelectedOffer(offer)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOffer === offer && styles.selectedText,
                    ]}
                  >
                    {offer}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.checkboxContainer}>
              <Text style={styles.checkboxText}>Online payment available</Text>
            </TouchableOpacity>

            {/* Delivery Time Section */}
            <Text style={styles.sectionTitle}>DELIVER TIME</Text>
            <View style={styles.buttonGroup}>
              {times.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.optionButton,
                    selectedTime === time && styles.selectedButton,
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedTime === time && styles.selectedText,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Pricing Section */}
            <Text style={styles.sectionTitle}>PRICING</Text>
            <View style={styles.buttonGroup}>
              {prices.map((price) => (
                <TouchableOpacity
                  key={price}
                  style={[
                    styles.optionButton,
                    selectedPrice === price && styles.selectedButton,
                  ]}
                  onPress={() => setSelectedPrice(price)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedPrice === price && styles.selectedText,
                    ]}
                  >
                    {price}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Rating Section */}
            <Text style={styles.sectionTitle}>RATING</Text>
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setSelectedRating(star)}
                >
                  <Text
                    style={[
                      styles.star,
                      star <= selectedRating
                        ? styles.filledStar
                        : styles.emptyStar,
                    ]}
                  >
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Filter Button */}
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>FILTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền mờ
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    width: width * 0.9, // 90% chiều rộng màn hình
    maxHeight: height * 0.8, // 80% chiều cao màn hình
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 20,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: "#FF6200",
    borderColor: "#FF6200",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedText: {
    color: "#FFF",
  },
  checkboxContainer: {
    marginTop: 15,
  },
  checkboxText: {
    fontSize: 14,
    color: "#333",
  },
  starContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  star: {
    fontSize: 24,
    marginRight: 5,
  },
  filledStar: {
    color: "#FF6200",
  },
  emptyStar: {
    color: "#DDD",
  },
  filterButton: {
    backgroundColor: "#FF6200",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  filterButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FilterComponent;
