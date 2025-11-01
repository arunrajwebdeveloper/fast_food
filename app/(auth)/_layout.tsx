import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import { Redirect, Slot } from "expo-router";
import images from "@/constants";
import useAuthStore from "@/store/auth.store";
import { SafeAreaView } from "react-native-safe-area-context";

const _layout = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Redirect href="./" />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className="bg-white h-full"
        keyboardShouldPersistTaps="handled"
      >
        {/* <View
          className="w-full relative"
          style={{ height: Dimensions.get("screen").height / 2.8 }}
        >
          <ImageBackground
            source={images.authBg}
            className="size-full rounded-b-3xl absolute overflow-hidden z-10"
            resizeMode="cover"
          />
        </View> */}
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default _layout;
