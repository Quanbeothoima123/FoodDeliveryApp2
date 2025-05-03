import { supabase } from "../supabaseHelper/supabase";
export const getUserId = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) {
      console.log("Error getting user:", error?.message || "No user logged in");
      return null;
    }
    return user.id;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
};
