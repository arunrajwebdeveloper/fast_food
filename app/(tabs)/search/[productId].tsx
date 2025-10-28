import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import useAppwrite from "@/lib/useAppwrite";
import { getFoodDetails } from "@/lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetailsPage() {
  const { productId } = useLocalSearchParams();

  const { data, refetch, loading } = useAppwrite({
    fn: getFoodDetails,
    params: {
      productId: productId?.toString(),
    },
  });

  useEffect(() => {
    if (productId) {
      refetch();
    }
  }, [productId]);

  if (loading) {
    return (
      <View>
        <Text>Loading Product Details...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View>
        <Text>Product Not Found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="h-full px-5 pt-5">
        <Image
          source={{ uri: data?.image_url }}
          className="size-48"
          resizeMode="contain"
        />

        <View>
          {/* Title and Price */}
          <View>
            <Text>{data.name}</Text>
            <Text>{data.price}</Text>
          </View>

          {/* Rating and Description */}
          <Text>⭐ {data.rating}</Text>
          <Text>About this product:</Text>
          <Text>Description: {data.description}</Text>
          <Text>Calories: {data.calories}</Text>
          <Text>Protein: {data.protein}</Text>
          <Text>Categories: {data.categories}</Text>

          {/* Action Button */}
          <TouchableOpacity>
            <Text>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
