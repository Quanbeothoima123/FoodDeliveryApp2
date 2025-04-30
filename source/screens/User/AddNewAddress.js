import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import MapView from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import CustomButton from "../../components/CustomButton";
import * as Location from "expo-location";

const AddNewAddressScreen = () => {
  const fontsLoaded = useCustomFonts();

  // Trạng thái cho bản đồ
  const [region, setRegion] = useState({
    latitude: 37.78825, // Vị trí mặc định (San Francisco)
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Trạng thái cho các trường nhập liệu
  const [street, setStreet] = useState("Hason Nagar");
  const [postCode, setPostCode] = useState("34567");
  const [apartment, setApartment] = useState("345");
  const [label, setLabel] = useState("Home");
  const [address, setAddress] = useState(
    "3235 Royal Ln. Mesa, New Jersey 34567"
  );

  // Lấy vị trí hiện tại để hiển thị bản đồ
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access location was denied. Using default location instead."
        );
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const { latitude, longitude } = location.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch (error) {
        console.log("Error getting location:", error);
        Alert.alert(
          "Error",
          "Could not fetch location. Using default location."
        );
      }
    })();
  }, []);
  if (!fontsLoaded) return null;
  return (
    <View style={styles.container}>
      {/* Bản đồ làm nền */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
        />
        <View style={styles.mapOverlay}>
          <View style={styles.mapInstruction}>
            <Text style={styles.mapInstructionText}>Move to edit location</Text>
          </View>
        </View>
      </View>

      {/* Form cố định */}
      <View style={styles.formContainer}>
        {/* Nút Back */}
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Địa chỉ */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontFamily: "Sen" }]}>ADDRESS</Text>
          <View style={styles.addressContainer}>
            <Ionicons
              name="location-outline"
              size={20}
              color="#A0A5BA"
              style={styles.addressIcon}
            />
            <Text style={[styles.addressText, { fontFamily: "Sen" }]}>
              {address}
            </Text>
          </View>
        </View>

        {/* Trường Street và Post Code */}
        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={[styles.label, { fontFamily: "Sen" }]}>STREET</Text>
            <TextInput
              style={[styles.input, { fontFamily: "Sen" }]}
              value={street}
              onChangeText={setStreet}
              placeholder="Enter street"
            />
          </View>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={[styles.label, { fontFamily: "Sen" }]}>POST CODE</Text>
            <TextInput
              style={[styles.input, { fontFamily: "Sen" }]}
              value={postCode}
              onChangeText={setPostCode}
              placeholder="Enter post code"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Trường Apartment */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontFamily: "Sen" }]}>APARTMENT</Text>
          <TextInput
            style={[styles.input, { fontFamily: "Sen" }]}
            value={apartment}
            onChangeText={setApartment}
            placeholder="Enter apartment number"
            keyboardType="numeric"
          />
        </View>

        {/* Chọn nhãn (Label As) */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontFamily: "Sen" }]}>LABEL AS</Text>
          <View style={styles.labelButtons}>
            <TouchableOpacity
              style={[
                styles.labelButton,
                label === "Home" && styles.labelButtonSelected,
              ]}
              onPress={() => setLabel("Home")}
            >
              <Text
                style={[
                  styles.labelButtonText,
                  { fontFamily: "Sen" },
                  label === "Home" && styles.labelButtonTextSelected,
                ]}
              >
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.labelButton,
                label === "Work" && styles.labelButtonSelected,
              ]}
              onPress={() => setLabel("Work")}
            >
              <Text
                style={[
                  styles.labelButtonText,
                  { fontFamily: "Sen" },
                  label === "Work" && styles.labelButtonTextSelected,
                ]}
              >
                Work
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.labelButton,
                label === "Other" && styles.labelButtonSelected,
              ]}
              onPress={() => setLabel("Other")}
            >
              <Text
                style={[
                  styles.labelButtonText,
                  { fontFamily: "Sen" },
                  label === "Other" && styles.labelButtonTextSelected,
                ]}
              >
                Other
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nút Save Location */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="SAVE LOCATION"
            backgroundColor="#FF7622"
            textColor="#FFFFFF"
            onPress={() =>
              console.log("Save location", {
                address,
                street,
                postCode,
                apartment,
                label,
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapInstruction: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  mapInstructionText: {
    color: "#FFF",
    fontSize: 12,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    marginTop: -20,
  },
  backButton: {
    position: "absolute",
    top: -300,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 22.5,
    padding: 10,
    zIndex: 10,
    width: 45,
    height: 45,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#32343E",
    marginBottom: 7,
    fontFamily: "Sen",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addressIcon: {
    marginRight: 10,
  },
  addressText: {
    fontSize: 12,
    color: "#6B6E82",
    fontFamily: "Sen",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  input: {
    fontSize: 12,
    color: "#6B6E82",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F5F7FA",
    borderRadius: 10,
    fontFamily: "Sen",
  },
  labelButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelButton: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 25,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    height: 45,
  },
  labelButtonSelected: {
    backgroundColor: "#FF7622",
  },
  labelButtonText: {
    fontSize: 14,
    color: "#32343E",
  },
  labelButtonTextSelected: {
    color: "#FFF",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AddNewAddressScreen;
