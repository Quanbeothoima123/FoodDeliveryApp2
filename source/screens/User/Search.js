import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CartButton from "../../components/CartButton";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import { supabase } from "../../supabaseHelper/supabase";
import { useNavigation } from "@react-navigation/native";
export default function SearchScreen() {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation(); // Thêm dòng này
  const [searchText, setSearchText] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const [recentKeywords, setRecentKeywords] = useState([]);
  const [suggestedRestaurants, setSuggestedRestaurants] = useState([]);
  const [popularFastFood, setPopularFastFood] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Lấy danh mục cho recentKeywords
      const { data: catData } = await supabase.from("category").select("*");
      setRecentKeywords(
        catData.map((cat) => ({
          id: cat.id,
          namecategory: cat.name,
        }))
      );

      // Lấy nhà hàng cho suggestedRestaurants
      const { data: resData } = await supabase
        .from("restaurant")
        .select("*")
        .limit(3);
      setSuggestedRestaurants(
        resData.map((res) => ({
          id: res.id,
          img: res.img,
          namerestaurant: res.name,
          starRate: res.starrating,
        }))
      );

      // Lấy món ăn cho popularFastFood
      const { data: prodData } = await supabase
        .from("product")
        .select("*, restaurant(name)")
        .limit(3);
      setPopularFastFood(
        prodData.map((prod) => ({
          id: prod.id,
          img: prod.img,
          pizzaName: prod.name,
          NameRestaurant: prod.restaurant.name,
        }))
      );
    };
    fetchData();
  }, []);

  const handleTextChange = (text) => {
    setSearchText(text);
    if (text.length === 0) {
      setSuggestion(null);
      return;
    }

    const sortedKeywords = [...recentKeywords].sort((a, b) =>
      a.namecategory.localeCompare(b.namecategory)
    );
    const matchedSuggestion = sortedKeywords.find((keyword) =>
      keyword.namecategory.toLowerCase().startsWith(text.toLowerCase())
    );
    setSuggestion(matchedSuggestion ? matchedSuggestion.namecategory : null);
  };

  const clearText = () => {
    setSearchText("");
    setSuggestion(null);
  };
  if (!fontsLoaded) return null;
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-back" size={24} color="#181C2E" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Search</Text>
        </View>

        <CartButton
          backgroundColor="#181C2E"
          onPress={() => console.log("Open cart")}
          badgeCount={2}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          value={suggestion || searchText}
          onChangeText={handleTextChange}
          autoCapitalize="none"
          selection={
            searchText.length
              ? { start: searchText.length, end: searchText.length }
              : undefined
          }
        />
        {searchText.length > 0 && (
          <TouchableOpacity style={styles.clearIcon} onPress={clearText}>
            <Icon name="close" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {/* Recent Keywords */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Keywords</Text>
      </View>
      <FlatList
        data={recentKeywords}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.keywordItem}
            onPress={() =>
              navigation.navigate("Food_B", { category: item.namecategory })
            } // Thêm onPress
          >
            <Text style={styles.keywordText}>{item.namecategory}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.keywordList}
      />

      {/* Suggested Restaurants */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Suggested Restaurants</Text>
      </View>
      {suggestedRestaurants.map((restaurant) => (
        <TouchableOpacity key={restaurant.id} style={styles.restaurantItem}>
          {/* <Image source={restaurant.img} style={styles.restaurantImage} /> */}
          <Image
            source={{ uri: restaurant.img }}
            style={styles.restaurantImage}
          />
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>
              {restaurant.namerestaurant}
            </Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={14} color="#FF7622" />
              <Text style={styles.ratingText}>{restaurant.starRate}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {/* Popular Fast Food */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Fast Food</Text>
      </View>
      <FlatList
        data={popularFastFood}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.fastFoodItem}>
            <View
              style={{
                position: "relative",
                alignItems: "center",
                overflow: "visible",
              }}
            >
              {/* <Image source={item.img} style={styles.fastFoodImage} /> */}
              <Image source={{ uri: item.img }} style={styles.fastFoodImage} />
              <View style={styles.fastFoodInfo}>
                <Text style={styles.fastFoodTitle}>{item.pizzaName}</Text>
                <Text style={styles.fastFoodRestaurant}>
                  {item.NameRestaurant}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.fastFoodList}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECF0F4",
    overflow: "hidden",
  },
  headerText: {
    fontFamily: "Sen",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 62,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontFamily: "Sen",
    fontSize: 14,
    color: "#32343E",
    fontWeight: "400",
    padding: 0,
  },
  clearIcon: {
    marginLeft: 10,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  sectionTitle: {
    fontFamily: "Sen",
    fontSize: 20,
    fontWeight: "regular",
    color: "#32343E",
  },
  keywordList: {
    paddingHorizontal: 20,
  },
  keywordItem: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  keywordText: {
    fontFamily: "Sen",
    fontSize: 16,
    fontWeight: "400",
    color: "#32343E",
  },
  restaurantItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  restaurantImage: {
    width: 60,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontFamily: "Sen",
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontFamily: "Sen",
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 5,
  },
  fastFoodList: {
    paddingHorizontal: 20,
  },

  fastFoodItem: {
    marginRight: 15,
    alignItems: "center",
    paddingTop: 50, // Để hình ảnh nổi lên mà không bị cắt
    marginBottom: 20,
  },

  fastFoodImage: {
    width: 122,
    height: 84,
    borderRadius: 20,
    position: "absolute",
    top: -50, // Hình nổi lên trên khung thông tin
    zIndex: 1,
  },

  fastFoodList: {
    paddingHorizontal: 15,
  },

  fastFoodTitle: {
    // Cách hình ảnh phía trên
    marginTop: 30,
    fontFamily: "Sen",
    fontSize: 15,
    fontWeight: "bold",
    color: "#32343E",
    textAlign: "left",
    marginBottom: 5,
  },

  fastFoodRestaurant: {
    fontSize: 13,
    color: "#646982",
    textAlign: "left",
  },

  // Đây là phần nền chứa tiêu đề và tên nhà hàng, giống với categoryInfo
  fastFoodInfo: {
    width: 153,
    height: 102,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});
