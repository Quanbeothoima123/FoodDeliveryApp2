import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

const PromoModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animatable.View
          animation="bounceIn"
          duration={500}
          style={styles.modalWrapper}
        >
          <LinearGradient
            colors={["#FBD72C", "#E76F01"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.modalContent}
          >
            {/* Nút đóng (X) */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>

            {/* Nội dung modal */}
            <Text style={styles.title}>HURRY OFFERS!</Text>
            <Text style={styles.code}>#1243CD2</Text>
            <Text style={styles.description}>
              Use the coupon get 25% discount
            </Text>

            {/* Nút "GOT IT" */}
            <TouchableOpacity style={styles.gotItButton} onPress={onClose}>
              <Text style={styles.gotItText}>GOT IT</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animatable.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalWrapper: {
    width: "90%",
    height: 390,
    borderRadius: 20,
  },
  modalContent: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1,
  },
  closeText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#fff",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  code: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "500",
  },
  gotItButton: {
    backgroundColor: "#F57C00",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    width: "70%",
    alignItems: "center",
  },
  gotItText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default PromoModal;
