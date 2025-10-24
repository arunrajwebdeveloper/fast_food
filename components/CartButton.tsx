import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import images from "@/constants";

const CartButton = () => {
  const totalItems = 10;
  return (
    <TouchableOpacity
      onPress={() => {}}
      className="flex-row justify-center items-center gap-x-1 w-10 h-10 rounded-full bg-black"
    >
      <Image
        source={images.bag}
        resizeMode="contain"
        className="size-7"
        tintColor="#ffffff"
      />

      {totalItems > 0 && (
        <View className="absolute -top-1 -right-1 z-10 bg-orange-600 w-6 h-6 rounded-full justify-center items-center">
          <Text className="text-white font-quicksand-medium text-sm">
            {totalItems}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
