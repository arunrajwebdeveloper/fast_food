import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";
import images from "@/constants";
import { router } from "expo-router";

const CartItem = ({ item }: { item: CartItemType }) => {
  const { increaseQty, decreaseQty, removeItem } = useCartStore();

  const handleProductPress = (productId: string) => {
    router.push({
      pathname: "/search/[productId]",
      params: { productId },
    });
  };

  return (
    <View className="cart-item">
      <View className="flex flex-row items-center gap-x-3">
        <TouchableOpacity
          onPress={() => handleProductPress(item.id)}
          className="cart-item__image"
        >
          <Image
            source={{ uri: item.image_url }}
            className="size-4/5 rounded-lg"
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View>
          <Text className="base-bold text-dark-100">{item.name}</Text>
          <Text className="paragraph-bold text-primary mt-1">
            ${item.price}
          </Text>

          <View className="flex flex-row items-center gap-x-4 mt-2">
            <TouchableOpacity
              onPress={() => decreaseQty(item.id, item.customizations!)}
              className="cart-item__actions"
            >
              <Image
                source={images.minus}
                className="size-4"
                resizeMode="contain"
                tintColor={"#FF9C01"}
              />
            </TouchableOpacity>

            <Text className="base-bold text-dark-100">{item.quantity}</Text>

            <TouchableOpacity
              onPress={() => increaseQty(item.id, item.customizations!)}
              className="cart-item__actions"
            >
              <Image
                source={images.plus}
                className="size-4"
                resizeMode="contain"
                tintColor={"#FF9C01"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => removeItem(item.id, item.customizations!)}
        className="flex-center"
      >
        <Image
          source={images.trash}
          tintColor="#fc574c"
          className="size-7"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
