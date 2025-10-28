import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { appwriteConfig, getCategory, getFoodDetails } from "@/lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import images from "@/constants";
import cn from "clsx";
import { useCartStore } from "@/store/cart.store";
import CustomButton from "@/components/CustomButton";
import { MenuItem } from "@/type";

interface DetailsState extends MenuItem {
  category: string;
}

function DataGrid({
  label,
  value,
  basis = "basis-1/2 ",
}: {
  label: string;
  value: number | string;
  basis?: string;
}) {
  return (
    <View className="flex-col">
      <Text
        className={cn("paragraph-medium !text-lg text-slate-500", basis)}
        numberOfLines={1}
      >
        {label}
      </Text>
      <Text
        className={cn("base-semibold !text-lg text-black", basis)}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

export default function ProductDetailsPage() {
  const { productId } = useLocalSearchParams();
  const { addItem, items, decreaseQty, increaseQty } = useCartStore();
  const [product, setProduct] = useState<DetailsState | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProductDetails = async () => {
    try {
      const details = await getFoodDetails({
        productId: productId?.toString(),
      });
      const categories = await getCategory({
        categoryId: details?.categories?.toString(),
      });

      const result = { ...details, category: categories?.name };
      setProduct(result as DetailsState);
    } catch (err) {
      throw new Error(err as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={50} color="#f97316" />
        </View>
      </SafeAreaView>
    );
  }

  if (!loading && !product) {
    return (
      <SafeAreaView className="bg-white h-full">
        <View className="flex-1 justify-center items-center">
          <Text className="text-sm text-slate-500">Product not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const imageUrl = `${product?.image_url}?project=${appwriteConfig.projectId}`;

  const cartItem = items?.find((item) => item.id === product?.$id);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="h-full ">
        <View className="px-5 pt-5 pb-32">
          <CustomHeader />
          <Text
            className="base-bold !text-3xl text-black mb-1"
            numberOfLines={1}
          >
            {product?.name}
          </Text>
          <View className="flex-row">
            <View className="basis-1/2">
              <View className="flex-row items-center gap-x-0.5">
                <Image
                  source={images.star}
                  tintColor="#feca10"
                  className="size-5"
                />
                <Text className="base-semibold">{product?.rating}</Text>
              </View>
              <Text className="base-semibold text-3xl text-orange-500 mt-4">
                ${product?.price}
              </Text>

              <View className="flex-row gap-x-10 mt-8">
                <DataGrid label="Calories:" value={product?.calories!} />
                <DataGrid label="Protein:" value={product?.protein!} />
              </View>
              <View className="mt-8">
                <DataGrid
                  basis="basis-1"
                  label="Categories:"
                  value={product?.category!}
                />
              </View>
              <View className="mt-8">
                <DataGrid basis="basis-1" label="Total Reviews:" value={328} />
              </View>
            </View>

            <View className="basis-1/2">
              <Image
                source={{ uri: imageUrl }}
                className="h-96 w-96"
                resizeMode="contain"
              />
            </View>
          </View>

          <View className="bg-blue-50 flex-row items-center rounded-full p-4">
            <View className="flex-row items-center justify-center gap-x-2 w-1/2 flex-none ">
              <Image
                source={images.delivery}
                tintColor="#334155"
                className="size-6"
              />
              <Text className="text-center base-semibold text-slate-700">
                Free Delivery
              </Text>
            </View>
            <View className="flex-row items-center justify-center gap-x-2 w-1/2 flex-none ">
              <Image
                source={images.clock}
                tintColor="#334155"
                className="size-5"
              />
              <Text className="text-center base-semibold text-slate-700">
                20-30 mins
              </Text>
            </View>
          </View>

          <View className="mt-8">
            <Text className="base-bold text-slate-700 !text-xl mb-4">
              Description:
            </Text>
            <Text className="paragraph-medium">{product?.description}</Text>
          </View>

          <View className="mt-8">
            <Text className="base-bold text-slate-700 !text-xl mb-4">
              Additional Information:
            </Text>
            <Text className="paragraph-medium">
              Duis ut augue in tortor venenatis vehicula eu eu purus. In ex
              sapien, fringilla id sollicitudin sit amet, laoreet in neque. Orci
              varius natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Sed purus sapien, convallis ac erat a, volutpat
              posuere lorem. Donec ipsum mauris, rutrum ac malesuada nec, porta
              vel velit. Cras viverra maximus lorem eu fringilla. Nunc efficitur
              eleifend augue, sed vestibulum eros porttitor eu. Duis non
              vestibulum nibh.
            </Text>
          </View>

          <View className="flex-row items-center gap-x-8 mt-6">
            <View className="flex flex-row items-center gap-x-4 mt-2">
              <TouchableOpacity
                onPress={() =>
                  decreaseQty(cartItem?.id, cartItem?.customizations! || [])
                }
                className="cart-item__actions size-11"
              >
                <Image
                  source={images.minus}
                  className="size-4"
                  resizeMode="contain"
                  tintColor="#FF9C01"
                />
              </TouchableOpacity>

              <Text className="base-bold text-dark-100">
                {cartItem?.quantity || 0}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  increaseQty(cartItem?.id, cartItem?.customizations! || [])
                }
                className="cart-item__actions size-11"
              >
                <Image
                  source={images.plus}
                  className="size-4"
                  resizeMode="contain"
                  tintColor="#FF9C01"
                />
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <CustomButton
                title={`Add to Cart ($${product?.price})`}
                style="bg-orange-500"
                onPress={() =>
                  addItem({
                    id: product?.$id,
                    name: product?.name,
                    price: product?.price,
                    image_url: imageUrl,
                    customizations: [],
                  })
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
