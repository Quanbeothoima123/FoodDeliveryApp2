import React, { createContext, useContext, useCallback } from "react";
import { supabase } from "../supabaseHelper/supabase";
import { getUserId } from "./authHelper";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const fetchCartCount = useCallback(async (userid) => {
    try {
      if (!userid) return 0;
      const { data, error } = await supabase
        .from("cart")
        .select("id")
        .eq("userid", userid);
      if (error) {
        console.log("Error fetching cart count:", error);
        return 0;
      }
      return data.length;
    } catch (error) {
      console.log("Error:", error);
      return 0;
    }
  }, []);

  return (
    <CartContext.Provider value={{ fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
