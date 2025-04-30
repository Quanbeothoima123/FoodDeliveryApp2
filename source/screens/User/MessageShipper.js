import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FeatherIcons from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
// Placeholder for the buyer's image
const buyerImage = require("../../../assets/images/User/american-spicy.jpg");

// Placeholder for the shipper's image
const shipperImage = require("../../../assets/images/User/shipper.jpg");

const messages = [
  { id: "1", text: "ARE YOU COMING?", sender: "buyer", time: "8:10 pm" },
  {
    id: "2",
    text: "Hay, Congratulation for order",
    sender: "shipper",
    time: "8:11 pm",
  },
  {
    id: "3",
    text: "Hey Where are you now?",
    sender: "buyer",
    time: "8:11 pm",
  },
  {
    id: "4",
    text: "I'm Coming , just wait ...",
    sender: "shipper",
    time: "8:12 pm",
  },
  { id: "5", text: "HURRY UP, MAN", sender: "buyer", time: "8:12 pm" },
];

const ChatScreen = () => {
  const fontsLoaded = useCustomFonts();
  const renderMessage = ({ item }) => (
    <View
      style={
        item.sender === "buyer"
          ? styles.buyerMessageContainer
          : styles.shipperMessageContainer
      }
    >
      {/* Time nằm trên message bubble */}
      <Text
        style={
          item.sender === "buyer"
            ? styles.timeTextBuyer
            : styles.timeTextShipper
        }
      >
        {item.time}
      </Text>

      <View
        style={[
          styles.messageWrapper,
          item.sender === "buyer" ? { flexDirection: "row-reverse" } : {},
        ]}
      >
        <Image
          source={item.sender === "buyer" ? buyerImage : shipperImage}
          style={
            item.sender === "buyer"
              ? styles.buyerImage
              : styles.shipperMessageImage
          }
        />

        <View
          style={
            item.sender === "buyer"
              ? styles.buyerMessage
              : styles.shipperMessage
          }
        >
          <Text
            style={
              item.sender === "buyer"
                ? styles.messageTextBuyer
                : styles.timeTextShipper
            }
          >
            {item.text}
          </Text>
        </View>
      </View>
    </View>
  );

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="close" size={20} color="#181C2E" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Robert Fox</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <FeatherIcons name="smile" size={20} color="#AFAFB0" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Write Something"
          placeholderTextColor="#AFAFB0"
        />
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            borderRadius: 22.5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <FeatherIcons name="send" size={20} color="#FF7622" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    // padding: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#ECF0F4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: "#000",
  },
  headerText: {
    fontFamily: "Sen",
    fontSize: 17,
    fontWeight: "400",
  },
  messageList: {
    padding: 10,
  },
  shipperMessageContainer: {
    alignItems: "flex-start",
    marginVertical: 5,
    width: 350,
  },
  buyerMessageContainer: {
    alignItems: "flex-end",
    marginVertical: 5,
  },
  messageWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  shipperMessage: {
    backgroundColor: "#F0F5FA",
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    height: 51,
    marginRight: 10,
  },
  buyerMessage: {
    justifyContent: "center",
    backgroundColor: "#FF7622",
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    height: 51,
    marginLeft: 10,
  },
  shipperMessageImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  buyerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  timeTextShipper: {
    textAlign: "left",
    marginLeft: 60,
    color: "#ABABAB",
    fontSize: 12,
    fontFamily: "Sen",
    marginBottom: 2,
  },
  timeTextBuyer: {
    textAlign: "right",
    marginRight: 60,
    color: "#ABABAB",
    fontSize: 12,
    fontFamily: "Sen",
    marginBottom: 2,
  },
  messageTextBuyer: {
    fontSize: 14,
    fontFamily: "Sen",
    fontWeight: "400",
    color: "#ffffff",
  },

  timeTextShipper: {
    fontSize: 14,
    fontFamily: "Sen",
    fontWeight: "400",
    color: "#32343E",
    marginBottom: 5,
  },
  inputContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "#F0F5FA",
    height: 65,
    borderRadius: 10,
  },
  smileyIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    fontSize: 12,
    fontFamily: "Sen",
    color: "#ABABAB",
    fontWeight: "400",
  },
  sendIcon: {
    fontSize: 20,
    marginLeft: 10,
    color: "#ff8c00",
  },
});

export default ChatScreen;
