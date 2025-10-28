import { useState } from "react";
import CustomHeader from "@/components/CustomHeader";
import useAuthStore from "@/store/auth.store";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import * as Sentry from "@sentry/react-native";

const profile = () => {
  const { user, signOutCurrentUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const logout = async () => {
    setIsSubmitting(true);
    try {
      await signOutCurrentUser();
      router.replace("/sign-in");
    } catch (err: any) {
      Alert.alert("Error", err?.message);
      Sentry.captureEvent(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="h-full px-5 pt-5">
        <CustomHeader title="My Profile" />
        <ScrollView>
          <View className="flex-1 pb-24 items-center">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 rounded-full"
              resizeMode="contain"
            />

            <View className="mt-10 items-center">
              <Text className="font-quicksand-bold text-black text-3xl mb-1">
                {user?.name}
              </Text>
              <Text className="font-quicksand-medium text-gray-700 text-lg">
                {user?.email}
              </Text>

              <TouchableOpacity
                disabled={isSubmitting}
                onPress={logout}
                className="mt-10 bg-red-100 w-full px-4 py-2 rounded-xl"
              >
                <Text className="text-red-700 font-quicksand-bold text-lg">
                  SignOut
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default profile;
