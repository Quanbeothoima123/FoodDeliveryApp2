import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import MapView from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import CustomButton from "../../components/CustomButton";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { supabase } from "../../supabaseHelper/supabase";

const AddNewAddressScreen = () => {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();
  const route = useRoute();
  const { addressId } = route.params || {};

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [street, setStreet] = useState("");
  const [postCode, setPostCode] = useState("");
  const [apartment, setApartment] = useState("");
  const [label, setLabel] = useState("");
  const [labels, setLabels] = useState([]); // Danh sách label từ Supabase
  const [address, setAddress] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Using default location.");
        return;
      }

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

      // Lấy danh sách label từ labeladdress
      const { data: labelData, error: labelError } = await supabase
        .from("labeladdress")
        .select("id, name");
      if (labelError) throw labelError;
      setLabels(labelData);
      setLabel(labelData[0]?.name || ""); // Mặc định chọn label đầu tiên

      if (addressId) {
        const { data, error } = await supabase
          .from("address")
          .select("address, postcode, street, apartment, labeladdress(name)")
          .eq("id", addressId)
          .single();
        if (error) throw error;
        setStreet(data.street || "");
        setPostCode(data.postcode || "");
        setApartment(data.apartment || "");
        setAddress(data.address || "");
        setLabel(data.labeladdress.name || labelData[0]?.name || "");
      }
    })();
  }, [addressId]);

  if (!fontsLoaded) return null;

  const handleSave = async () => {
    const selectedLabel = labels.find((l) => l.name === label);
    if (!selectedLabel) {
      Alert.alert("Error", "Please select a valid label.");
      return;
    }

    if (addressId) {
      const { error } = await supabase
        .from("address")
        .update({
          address,
          postcode: postCode,
          street,
          apartment,
          labelid: selectedLabel.id,
        })
        .eq("id", addressId);
      if (error) throw error;
    } else {
      const userId = (await supabase.auth.getUser()).data.user.id;
      const { error } = await supabase.from("address").insert({
        userid: userId,
        address,
        postcode: postCode,
        street,
        apartment,
        labelid: selectedLabel.id,
      });
      if (error) throw error;
    }
    navigation.navigate("MyAddressScreen");
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.formContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("MyAddressScreen")}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontFamily: "Sen" }]}>ADDRESS</Text>
          <View style={styles.addressContainer}>
            <Ionicons
              name="location-outline"
              size={20}
              color="#A0A5BA"
              style={styles.addressIcon}
            />
            <TextInput
              style={[styles.addressText, { fontFamily: "Sen", flex: 1 }]}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter address"
            />
          </View>
        </View>

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

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontFamily: "Sen" }]}>APARTMENT</Text>
          <TextInput
            style={[styles.input, { fontFamily: "Sen" }]}
            value={apartment}
            onChangeText={setApartment}
            placeholder="Enter apartment number"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontFamily: "Sen" }]}>LABEL AS</Text>
          <View style={styles.labelButtons}>
            {labels.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.labelButton,
                  label === item.name && styles.labelButtonSelected,
                ]}
                onPress={() => setLabel(item.name)}
              >
                <Text
                  style={[
                    styles.labelButtonText,
                    { fontFamily: "Sen" },
                    label === item.name && styles.labelButtonTextSelected,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="SAVE LOCATION"
            backgroundColor="#FF7622"
            textColor="#FFFFFF"
            onPress={handleSave}
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
    marginTop: -90,
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
