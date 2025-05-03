import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Polyline, Marker } from "react-native-maps";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import Ionicon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useCustomFonts } from "../../hooks/useCustomFonts";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_SHEET_HEIGHT = SCREEN_HEIGHT * 0.8;
const MIN_SHEET_HEIGHT = 150;
const { width } = Dimensions.get("window");
const TrackingOrder = () => {
  const fontsLoaded = useCustomFonts();
  const translateY = useSharedValue(MIN_SHEET_HEIGHT);
  const navigation = useNavigation();
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      let newY = ctx.startY - event.translationY;
      if (newY < MIN_SHEET_HEIGHT) newY = MIN_SHEET_HEIGHT;
      if (newY > MAX_SHEET_HEIGHT) newY = MAX_SHEET_HEIGHT;
      translateY.value = newY;
    },
    onEnd: () => {
      if (translateY.value < (MAX_SHEET_HEIGHT + MIN_SHEET_HEIGHT) / 2) {
        translateY.value = withSpring(MAX_SHEET_HEIGHT);
      } else {
        translateY.value = withSpring(MIN_SHEET_HEIGHT);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: translateY.value,
    };
  });

  const routeCoordinates = [
    { latitude: 37.78825, longitude: -122.4324 },
    { latitude: 37.7885, longitude: -122.431 },
    { latitude: 37.789, longitude: -122.429 },
    { latitude: 37.79, longitude: -122.428 },
  ];
  if (!fontsLoaded) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={routeCoordinates[0]} pinColor="red" />
          <Marker coordinate={routeCoordinates[routeCoordinates.length - 1]} />
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#FF8C00"
            strokeWidth={4}
          />
        </MapView>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("HomeVer1")}
        >
          <Ionicon name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.bottomSheet, animatedStyle]}>
            <View style={styles.sheetHandle}>
              <View style={styles.handleBar} />
            </View>

            <View style={styles.sheetContent}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <View>
                  <Image
                    source={require("../../../assets/images/User/TrackOrderResraurant.png")}
                  />
                </View>
                <View style={{ marginLeft: 20 }}>
                  <Text style={styles.restaurantName}>Uttora Coffee House</Text>
                  <Text style={styles.orderDetails}>
                    Ordered At 06 Sept, 10:00pm
                  </Text>
                  <View style={{ marginTop: 20 }}>
                    <Text style={styles.orderItems}>2x Burger</Text>
                    <Text style={styles.orderItems}>4x Sandwich</Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.deliveryTime}>20 min</Text>
                <Text style={styles.estimatedText}>
                  ESTIMATED DELIVERY TIME
                </Text>
              </View>
              <View style={{ marginTop: 40 }}>
                <View style={styles.statusContainer}>
                  <View style={styles.statusDotActive}>
                    <Ionicon
                      name="checkmark-outline"
                      size={10}
                      color={"#ffffff"}
                    />
                  </View>
                  <Text style={styles.statusTextActive}>
                    Your order has been received
                  </Text>
                </View>
                <View style={styles.statusLineActive} />
                <View style={styles.statusContainer}>
                  <View style={styles.statusDotActive}>
                    <FeatherIcon name="loader" size={10} color={"#ffffff"} />
                  </View>
                  <Text style={styles.statusTextActive}>
                    The restaurant is preparing your food
                  </Text>
                </View>
                <View style={styles.statusLineActive} />
                <View style={styles.statusContainer}>
                  <View style={styles.statusDot}>
                    <Ionicon
                      name="checkmark-outline"
                      size={10}
                      color={"#ffffff"}
                    />
                  </View>
                  <Text style={styles.statusText}>
                    Your order has been picked up for delivery
                  </Text>
                </View>
                <View style={styles.statusLine} />
                <View style={styles.statusContainer}>
                  <View style={styles.statusDot}>
                    <Ionicon
                      name="checkmark-outline"
                      size={10}
                      color={"#ffffff"}
                    />
                  </View>
                  <Text style={styles.statusText}>Order arriving soon!</Text>
                </View>
              </View>

              <View style={styles.courierContainer}>
                <Image
                  source={require("../../../assets/images/User/robertF.png")}
                  style={styles.courierImage}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.courierName}>Robert F.</Text>
                  <Text style={styles.courierLabel}>Courier</Text>
                </View>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => navigation.navigate("CallScreen")}
                >
                  <Ionicon name="call-outline" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.chatButton}
                  onPress={() => navigation.navigate("ChatScreen")}
                >
                  <Image
                    source={require("../../../assets/images/User/messenger.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 40,
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
  backText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  sheetHandle: {
    alignItems: "center",
    marginBottom: 10,
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 2.5,
  },
  sheetContent: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "Sen",
  },
  orderDetails: {
    fontSize: 14,
    color: "#A0A5BA",
    marginVertical: 5,
    fontFamily: "Sen",
  },
  orderItems: {
    fontFamily: "Sen",
    fontSize: 13,
    color: "#646982",
  },
  deliveryTime: {
    fontSize: 30,
    fontWeight: "900",
    marginTop: 20,
    textAlign: "center",
  },
  estimatedText: {
    fontSize: 14,
    fontFamily: "Sen",
    fontWeight: "400",
    color: "#A0A5BA",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 20,
  },
  statusDot: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 12,
    height: 12,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  statusDotActive: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 12,
    height: 12,
    borderRadius: 5,
    backgroundColor: "#FF7622",
    marginRight: 10,
  },
  statusText: {
    fontFamily: "Sen",
    fontWeight: "400",
    fontSize: 13,
    color: "#333",
  },
  statusTextActive: {
    fontFamily: "Sen",
    fontWeight: "400",
    fontSize: 13,
    color: "#FF7622",
  },
  statusLine: {
    width: 2,
    height: 30,
    backgroundColor: "#666666",
    marginLeft: 4,
  },
  statusLineActive: {
    width: 2,
    height: 30,
    backgroundColor: "#FF7622",
    marginLeft: 4,
  },
  courierContainer: {
    width: width,
    position: "relative",
    left: -20,
    bottom: -140,
    backgroundColor: "white", // hoặc màu nền bạn muốn
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16, // tạo khoảng cách bên trong
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // tuỳ chỉnh nếu cần
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8, // cho Android bóng đổ
  },

  courierImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  courierName: {
    fontFamily: "Sen",
    fontSize: 20,
    fontWeight: "bold",
  },
  courierLabel: {
    fontSize: 14,
    fontFamily: "Sen",
    fontWeight: "400",
    color: "#A0A5BA",
  },
  callButton: {
    backgroundColor: "#FF7622",
    borderRadius: 22.5,
    padding: 10,
    marginHorizontal: 15,
    width: 45,
    height: 45,

    // Hiệu ứng mờ bên ngoài (iOS)
    shadowColor: "#FF7622",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,

    // Hiệu ứng mờ bên ngoài (Android)
    elevation: 10,
  },

  chatButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 22.5,
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "#FF7622",
  },
});

export default TrackingOrder;
