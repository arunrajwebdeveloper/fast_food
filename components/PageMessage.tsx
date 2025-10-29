import { router } from "expo-router";
import { View, Text, Image, Pressable } from "react-native";

const PageMessage = ({
  image,
  title,
  description,
  linkUrl,
  linkText,
}: {
  image: any;
  title: string;
  description: string;
  linkUrl?: any;
  linkText?: string;
}) => {
  return (
    <View className="justify-center items-center">
      <Image source={image} className="size-44 mb-4" resizeMode="contain" />
      <Text
        className="text-center font-quicksand-bold text-lg text-slate-600 mb-2"
        numberOfLines={1}
      >
        {title}
      </Text>
      <Text className="text-center font-quicksand-medium text-base text-slate-400">
        {description}
      </Text>
      {linkUrl && linkText && (
        <Pressable onPress={() => router.push(linkUrl)} className="mt-6">
          <Text className="paragraph-medium text-orange-500 underline">
            {linkText}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default PageMessage;
