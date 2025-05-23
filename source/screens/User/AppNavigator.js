// import {
//   NavigationContainer,
//   createNavigationContainerRef,
// } from "@react-navigation/native"; // Thêm createNavigationContainerRef
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useEffect } from "react";
// import { ImageComponent, Linking } from "react-native";
// import { CartProvider } from "../../utils/CartContext";
// import Login from "./Login";
// import SignUp from "./SignUp";
// import ForgotPassWord from "./ForgotPassWord";
// import VerificationScreen from "./Verification";
// import HomeVer1 from "./HomeVer1";
// import SearchScreen from "./Search";
// import FoodScreen from "./Food_B";
// import FoodDetailScreen from "./FoodDetail";
// import RestaurantScreen from "./Restaurant";
// import CartScreen from "./CartScreen";
// import CartPayment from "./CardPayment";
// import AddCardScreen from "./AddCard";
// import PaymentSuccessScreen from "./PaymentSuccessful";
// import TrackingOrder from "./TrackingOrder";
// import CallScreen from "./CallShipper";
// import ChatScreen from "./MessageShipper";
// import ProfileScreen from "./Profile";
// import PersonalInfoScreen from "./PersonalInfo";
// import EditProfileScreen from "./EditProfile";
// import MyAddressScreen from "./Address";
// import AddNewAddressScreen from "./AddNewAddress";
// import MyOrdersScreen from "./MyOrders";
// import Splash_one from "./Splash_one";
// import Splash_two from "./Splash_two";
// import OnBoarding_on from "./OnBoarding_one";
// import OnBoarding_two from "./OnBoarding_two";
// import OnBoarding_three from "./OnBoarding_three";
// import OnBoarding_four from "./OnBoarding_four";
// import { supabase } from "../../supabaseHelper/supabase";

// import { Alert } from "react-native";
// const Stack = createNativeStackNavigator();
// const navigationRef = createNavigationContainerRef(); // Tạo navigationRef

// export default function AppNavigator() {
//   useEffect(() => {
//     const handleDeepLink = async ({ url }) => {
//       console.log("Deep link URL:", url);
//       if (url.includes("/--/auth/callback")) {
//         try {
//           const { data, error } = await supabase.auth.getSession();
//           if (error) {
//             console.error("Error getting session:", error.message);
//             Alert.alert("Lỗi", "Không thể xác minh. Vui lòng thử lại.");
//             if (navigationRef.current) {
//               navigationRef.current.navigate("Login");
//             }
//           } else if (data.session) {
//             console.log("Session:", data.session);
//             const { error: profileError } = await supabase
//               .from("profile")
//               .insert({
//                 userid: data.session.user.id,
//                 fullname: data.session.user.user_metadata.fullname || "",
//                 email: data.session.user.email,
//               });
//             if (profileError) {
//               console.error("Profile insert error:", profileError.message);
//             }
//             Alert.alert("Thành công", "Xác minh thành công!"); // Thêm thông báo
//             if (navigationRef.current) {
//               navigationRef.current.navigate("Login");
//             }
//           } else {
//             console.log("No session found");
//             Alert.alert("Thành công", "Xác minh thành công!"); // Thêm thông báo
//             if (navigationRef.current) {
//               navigationRef.current.navigate("Login");
//             }
//           }
//         } catch (err) {
//           console.error("Deep link error:", err);
//           Alert.alert("Lỗi", "Không thể xác minh. Vui lòng thử lại.");
//           if (navigationRef.current) {
//             navigationRef.current.navigate("Login");
//           }
//         }
//       }
//     };

//     Linking.addEventListener("url", handleDeepLink);
//     Linking.getInitialURL().then((url) => {
//       if (url) handleDeepLink({ url });
//     });

//     return () => {
//       Linking.removeAllListeners("url");
//     };
//   }, []);

//   return (
//     <CartProvider>
//       <NavigationContainer ref={navigationRef}>
//         <Stack.Navigator
//           initialRouteName="Login"
//           screenOptions={{ headerShown: false }}
//         >
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="SignUp" component={SignUp} />
//           <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} />
//           <Stack.Screen name="Verification" component={VerificationScreen} />
//           <Stack.Screen name="HomeVer1" component={HomeVer1} />
//           <Stack.Screen name="SearchScreen" component={SearchScreen} />
//           <Stack.Screen name="Food_B" component={FoodScreen} />
//           <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
//           <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
//           <Stack.Screen name="CartScreen" component={CartScreen} />
//           <Stack.Screen name="Payment" component={CartPayment} />
//           <Stack.Screen name="AddCardScreen" component={AddCardScreen} />
//           <Stack.Screen
//             name="PaymentSuccessScreen"
//             component={PaymentSuccessScreen}
//           />
//           <Stack.Screen name="TrackingOrder" component={TrackingOrder} />
//           <Stack.Screen name="CallScreen" component={CallScreen} />
//           <Stack.Screen name="ChatScreen" component={ChatScreen} />
//           <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
//           <Stack.Screen
//             name="PersonalInfoScreen"
//             component={PersonalInfoScreen}
//           />
//           <Stack.Screen
//             name="EditProfileScreen"
//             component={EditProfileScreen}
//           />
//           <Stack.Screen name="MyAddressScreen" component={MyAddressScreen} />
//           <Stack.Screen
//             name="AddNewAddressScreen"
//             component={AddNewAddressScreen}
//           />
//           <Stack.Screen name="MyOrdersScreen" component={MyOrdersScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </CartProvider>
//   );
// }

import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect } from "react";
import { Alert, Linking } from "react-native";
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
import ProfileScreen from "./Profile";
import PersonalInfoScreen from "./PersonalInfo";
import EditProfileScreen from "./EditProfile";
import MyAddressScreen from "./Address";
import AddNewAddressScreen from "./AddNewAddress";
import MyOrdersScreen from "./MyOrders";
import Splash_one from "./Splash_one";
import Splash_two from "./Splash_two";
import OnBoarding_one from "./OnBoarding_one";
import OnBoarding_two from "./OnBoarding_two";
import OnBoarding_three from "./OnBoarding_three";
import OnBoarding_four from "./OnBoarding_four";
import { supabase } from "../../supabaseHelper/supabase";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const navigationRef = createNavigationContainerRef();

function OnboardingTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { display: "none" }, // Hide tab bar
        swipeEnabled: true, // Enable swipe navigation
      }}
    >
      <Tab.Screen name="OnBoarding_one" component={OnBoarding_one} />
      <Tab.Screen name="OnBoarding_two" component={OnBoarding_two} />
      <Tab.Screen name="OnBoarding_three" component={OnBoarding_three} />
      <Tab.Screen name="OnBoarding_four" component={OnBoarding_four} />
    </Tab.Navigator>
  );
}

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
            Alert.alert("Thành công", "Xác minh thành công!");
            if (navigationRef.current) {
              navigationRef.current.navigate("Login");
            }
          } else {
            console.log("No session found");
            Alert.alert("Thành công", "Xác minh thành công!");
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

    // Splash screen navigation logic
    const splashTimeout1 = setTimeout(() => {
      if (navigationRef.current) {
        navigationRef.current.navigate("Splash_two");
      }
    }, 2000); // 2 seconds on Splash_one

    const splashTimeout2 = setTimeout(() => {
      if (navigationRef.current) {
        navigationRef.current.navigate("OnboardingTabs");
      }
    }, 4000); // 2 more seconds on Splash_two (total 4 seconds from start)

    Linking.addEventListener("url", handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => {
      Linking.removeAllListeners("url");
      clearTimeout(splashTimeout1);
      clearTimeout(splashTimeout2);
    };
  }, []);

  return (
    <CartProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Splash_one"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash_one" component={Splash_one} />
          <Stack.Screen name="Splash_two" component={Splash_two} />
          <Stack.Screen
            name="OnboardingTabs"
            component={OnboardingTabs}
            options={{ gestureEnabled: false }}
          />
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
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen
            name="PersonalInfoScreen"
            component={PersonalInfoScreen}
          />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
          <Stack.Screen name="MyAddressScreen" component={MyAddressScreen} />
          <Stack.Screen
            name="AddNewAddressScreen"
            component={AddNewAddressScreen}
          />
          <Stack.Screen name="MyOrdersScreen" component={MyOrdersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
