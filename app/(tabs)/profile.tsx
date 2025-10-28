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
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import * as Sentry from "@sentry/react-native";

const profile = () => {
  const { user, isLoading, signOutCurrentUser } = useAuthStore();
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

  if (isLoading) {
    return (
      <SafeAreaView className="bg-white h-full">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={50} color="#f97316" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full bg-slate-50">
      <View className="h-full px-5 pt-5">
        <CustomHeader title="My Profile" />
        <ScrollView>
          <View className="flex-1 pb-24 items-center">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 rounded-full"
              resizeMode="contain"
            />

            <View className="mt-10 relative items-center bg-white w-full p-4 rounded-3xl shadow-sm">
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
                <Text className="text-red-700 text-center font-quicksand-bold text-lg">
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
