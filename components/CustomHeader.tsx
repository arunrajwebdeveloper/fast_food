import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { CustomHeaderProps } from "@/type";
import images from "@/constants";

const CustomHeader = ({ title }: CustomHeaderProps) => {
  const router = useRouter();

  return (
    <View className="custom-header">
      <TouchableOpacity onPress={() => router.back()} activeOpacity={0.9}>
        <Image
          source={images.arrowBack}
          className="size-7"
          resizeMode="contain"
        />
      </TouchableOpacity>

      {title && <Text className="base-semibold text-dark-100">{title}</Text>}
      <TouchableOpacity
        onPress={() => router.push("/search/menu")}
        activeOpacity={0.9}
      >
        <Image
          source={images.magnifer}
          className="size-6"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
