import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import cn from "clsx";
import { CustomButtonProps } from "@/type";

const CustomButton = ({
  onPress,
  title = "Click me",
  className,
  textStyle,
  leftIcon,
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        "w-full p-3 rounded-lg font-quicksand-medium outline-0 ring-0 bg-emerald-700",
        className
      )}
    >
      {leftIcon}
      <View className=" items-center justify-center">
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            className={cn(
              "text-white font-quicksand-bold text-center text-xl",
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
