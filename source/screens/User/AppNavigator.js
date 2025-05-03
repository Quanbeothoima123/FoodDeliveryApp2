import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native"; // Thêm createNavigationContainerRef
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Linking } from "react-native";
import { CartProvider } from "../../utils/CartContext";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassWord from "./ForgotPassWord";
import VerificationScreen from "./Verification";
import HomeVer1 from "./HomeVer1";
import SearchScreen from "./Search";
import FoodScreen from "./Food_B";
import FoodDetailScreen from "./FoodDetail";
import RestaurantScreen from "./Restaurant";
import CartScreen from "./CartScreen";
import CartPayment from "./CardPayment";
import AddCardScreen from "./AddCard";
import PaymentSuccessScreen from "./PaymentSuccessful";
import TrackingOrder from "./TrackingOrder";
import CallScreen from "./CallShipper";
import ChatScreen from "./MessageShipper";
import { supabase } from "../../supabaseHelper/supabase";
import { Alert } from "react-native";
const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef(); // Tạo navigationRef

export default function AppNavigator() {
  useEffect(() => {
    const handleDeepLink = async ({ url }) => {
      console.log("Deep link URL:", url);
      if (url.includes("/--/auth/callback")) {
        try {
          const { data, error } = await supabase.auth.getSession();
          if (error) {
            console.error("Error getting session:", error.message);
            Alert.alert("Lỗi", "Không thể xác minh. Vui lòng thử lại.");
            if (navigationRef.current) {
              navigationRef.current.navigate("Login");
            }
          } else if (data.session) {
            console.log("Session:", data.session);
            const { error: profileError } = await supabase
              .from("profile")
              .insert({
                userid: data.session.user.id,
                fullname: data.session.user.user_metadata.fullname || "",
                email: data.session.user.email,
              });
            if (profileError) {
              console.error("Profile insert error:", profileError.message);
            }
            Alert.alert("Thành công", "Xác minh thành công!"); // Thêm thông báo
            if (navigationRef.current) {
              navigationRef.current.navigate("Login");
            }
          } else {
            console.log("No session found");
            Alert.alert("Thành công", "Xác minh thành công!"); // Thêm thông báo
            if (navigationRef.current) {
              navigationRef.current.navigate("Login");
            }
          }
        } catch (err) {
          console.error("Deep link error:", err);
          Alert.alert("Lỗi", "Không thể xác minh. Vui lòng thử lại.");
          if (navigationRef.current) {
            navigationRef.current.navigate("Login");
          }
        }
      }
    };

    Linking.addEventListener("url", handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => {
      Linking.removeAllListeners("url");
    };
  }, []);

  return (
    <CartProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="HomeVer1" component={HomeVer1} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="Food_B" component={FoodScreen} />
          <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
          <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="Payment" component={CartPayment} />
          <Stack.Screen name="AddCardScreen" component={AddCardScreen} />
          <Stack.Screen
            name="PaymentSuccessScreen"
            component={PaymentSuccessScreen}
          />
          <Stack.Screen name="TrackingOrder" component={TrackingOrder} />
          <Stack.Screen name="CallScreen" component={CallScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
