import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import images from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { router } from "expo-router";

const CartButton = () => {
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  return (
    <TouchableOpacity
      onPress={() => router.push("/cart")}
      className="cart-btn"
      activeOpacity={0.9}
    >
      <Image
        source={images.bag}
        resizeMode="contain"
        className="size-6"
        tintColor="#ffffff"
      />

      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="small-bold text-white">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
