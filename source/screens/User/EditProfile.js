import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { supabase } from "../../supabaseHelper/supabase";
import { getUserId } from "../../utils/authHelper";
import { StyleSheet } from "react-native";

const defaultAvatar = require("../../../assets/images/User/american-spicy.jpg");

const EditProfileScreen = () => {
  const fontsLoaded = useCustomFonts();
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    bio: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Lấy dữ liệu từ Supabase
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userId = await getUserId();
        if (!userId) {
          Alert.alert("Error", "No user logged in");
          return;
        }

        const { data, error } = await supabase
          .from("profile")
          .select("fullname, email, phonenumber, bio, avatar")
          .eq("userid", userId)
          .single();

        if (error) {
          Alert.alert("Error", "Failed to fetch profile: " + error.message);
          return;
        }

        setProfile({
          fullname: data.fullname || "",
          email: data.email || "",
          phonenumber: data.phonenumber || "",
          bio: data.bio || "",
          avatar: data.avatar || null,
        });
      } catch (err) {
        Alert.alert("Error", "Unexpected error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Chọn và upload ảnh
  const pickImage = async () => {
    try {
      setUploading(true);

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Please allow photo access");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (result.canceled) return;

      const uri = result.assets[0].uri;
      const userId = await getUserId();
      if (!userId) {
        Alert.alert("Error", "No user logged in");
        return;
      }

      const fileExt = uri.split(".").pop(); // lấy jpg / jpeg / png
      const fileName = `${userId}_${Date.now()}.${fileExt}`;
      const fileType = `image/${fileExt}`;

      // Đọc file ảnh bằng expo-file-system
      const fileInfo = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const arrayBuffer = Uint8Array.from(atob(fileInfo), (c) =>
        c.charCodeAt(0)
      );

      // Upload ảnh lên bucket 'avatars' bằng Supabase client
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, arrayBuffer, {
          contentType: fileType,
        });

      if (uploadError) {
        throw new Error("Upload failed: " + uploadError.message);
      }

      // Lấy public URL
      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;
      setProfile({ ...profile, avatar: publicUrl });
    } catch (err) {
      console.log("Upload error:", err);
      Alert.alert("Error", err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Lưu thay đổi
  const saveProfile = async () => {
    try {
      setLoading(true);
      const userId = await getUserId();
      if (!userId) {
        Alert.alert("Error", "No user logged in");
        return;
      }

      const { error } = await supabase
        .from("profile")
        .update({
          fullname: profile.fullname,
          phonenumber: profile.phonenumber,
          bio: profile.bio,
          avatar: profile.avatar,
        })
        .eq("userid", userId);

      if (error) {
        Alert.alert("Error", "Failed to save profile: " + error.message);
        return;
      }

      Alert.alert("Success", "Profile updated successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      Alert.alert("Error", "Unexpected error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#181C2E" />
        </TouchableOpacity>
        <Text style={[styles.title, { fontFamily: "Sen" }]}>Edit Profile</Text>
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View>
          <Image
            style={styles.avatarProfile}
            source={profile.avatar ? { uri: profile.avatar } : defaultAvatar}
          />
          <TouchableOpacity
            style={styles.editAvatar}
            onPress={pickImage}
            disabled={uploading}
          >
            <FeatherIcon
              name="edit-2"
              size={15}
              color={uploading ? "#999" : "#FFFFFF"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Các trường nhập liệu */}
      <Text style={[styles.label, { fontFamily: "Sen" }]}>FULL NAME</Text>
      <TextInput
        style={[styles.input, { fontFamily: "Sen" }]}
        value={profile.fullname}
        onChangeText={(text) => setProfile({ ...profile, fullname: text })}
        placeholder="Enter full name"
        placeholderTextColor="#6B6E82"
      />

      <Text style={[styles.label, { fontFamily: "Sen" }]}>EMAIL</Text>
      <TextInput
        style={[styles.input, { fontFamily: "Sen", color: "#999" }]}
        value={profile.email}
        editable={false}
        placeholderTextColor="#6B6E82"
      />

      <Text style={[styles.label, { fontFamily: "Sen" }]}>PHONE NUMBER</Text>
      <TextInput
        style={[styles.input, { fontFamily: "Sen" }]}
        value={profile.phonenumber}
        onChangeText={(text) => setProfile({ ...profile, phonenumber: text })}
        placeholder="Enter phone number"
        placeholderTextColor="#6B6E82"
      />

      <Text style={[styles.label, { fontFamily: "Sen" }]}>BIO</Text>
      <TextInput
        style={[styles.input, { fontFamily: "Sen" }]}
        value={profile.bio}
        onChangeText={(text) => setProfile({ ...profile, bio: text })}
        placeholder="Enter bio"
        placeholderTextColor="#6B6E82"
      />

      <View style={styles.buttonContainer}>
        <CustomButton
          title={loading ? "SAVING..." : "SAVE"}
          backgroundColor="#FF7622"
          textColor="#FFFFFF"
          onPress={saveProfile}
          disabled={loading || uploading}
        />
      </View>
    </View>
  );
};

// Giữ styles từ file gốc, không thêm mới
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
    marginRight: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#181C2E",
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatarProfile: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  editAvatar: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bottom: 40,
    right: -90,
    backgroundColor: "#FF7622",
    borderRadius: 20.5,
    width: 41,
    height: 41,
  },
  label: {
    fontSize: 14,
    color: "#32343E",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F0F5FA",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
    height: 56,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
  },
});

export default EditProfileScreen;
