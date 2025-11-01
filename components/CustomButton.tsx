import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import cn from "clsx";
import { CustomButtonProps } from "@/type";

const CustomButton = ({
  onPress,
  title = "Click me",
  style,
  textStyle,
  leftIcon,
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn("custom-btn", style)}
      activeOpacity={0.9}
    >
      {leftIcon}
      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            className={cn(
              "text-white-100 font-quicksand-bold text-lg",
              textStyle
            )}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
