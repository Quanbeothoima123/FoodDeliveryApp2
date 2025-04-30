import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useCustomFonts } from "../../hooks/useCustomFonts";

const CallScreen = () => {
  const fontsLoaded = useCustomFonts();
  const avatarUri = "../../../assets/images/User/shipper.jpg";

  const bounceAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ImageBackground source={require(avatarUri)} style={styles.container}>
      <View style={styles.overlay} />

      {/* Khu vực thông tin người gọi */}
      <View style={styles.callInfoContainer}>
        <Image source={require(avatarUri)} style={styles.avatar} />
        <Text style={styles.name}>ROBERT FOX</Text>
        <Text style={styles.status}>Connecting.....</Text>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton}>
            <Icon name="mic-off" size={24} color="#181C2E" />
          </TouchableOpacity>

          {/* Nút kết thúc cuộc gọi với hiệu ứng phát sáng và bounce */}
          <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
            <View style={styles.glowWrapper}>
              {/* Outer glow ring */}
              <Animated.View
                style={[
                  styles.glowRing,
                  {
                    backgroundColor: "#FFECDF",
                    opacity: glowAnim,
                    transform: [
                      {
                        scale: glowAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.6],
                        }),
                      },
                    ],
                  },
                ]}
              />
              {/* Inner glow ring */}
              <Animated.View
                style={[
                  styles.glowRing,
                  {
                    backgroundColor: "#FFF8F4",
                    opacity: glowAnim,
                    transform: [
                      {
                        scale: glowAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.3],
                        }),
                      },
                    ],
                  },
                ]}
              />
              {/* Nút đỏ */}
              <TouchableOpacity style={styles.endCallButton}>
                <Ionicon name="call-outline" size={30} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          <TouchableOpacity style={styles.controlButton}>
            <Icon name="volume-up" size={24} color="#181C2E" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(42, 60, 68, 0.8)",
  },
  callInfoContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    paddingBottom: 40,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    height: 377,
  },
  avatar: {
    width: 105,
    height: 105,
    borderRadius: 52.5,
    marginBottom: 10,
  },
  name: {
    fontFamily: "Sen",
    fontSize: 20,
    fontWeight: "bold",
    color: "#181C2E",
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    fontFamily: "Sen",
    fontWeight: "400",
    color: "#979797",
    marginBottom: 20,
  },
  controls: {
    marginTop: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "baseline",
    width: "60%",
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ECF0F4",
    justifyContent: "center",
    alignItems: "center",
  },
  endCallButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF3434",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    zIndex: 10,
  },
  glowWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    position: "relative",
  },
  glowRing: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 50,
    zIndex: 1,
  },
});

export default CallScreen;
