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
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import * as Sentry from "@sentry/react-native";
import images from "@/constants";
import cn from "clsx";

const ProfileLinkItem = ({
  icon,
  label,
  iconColor,
  onPress,
  disabled,
}: {
  icon: any;
  label: string;
  iconColor: string;
  onPress: () => void;
  disabled?: boolean;
}) => {
  return (
    <Pressable
      className="w-full py-5 px-6"
      onPress={onPress}
      disabled={disabled}
    >
      <View className="flex-row items-center justify-between gap-x-2">
        <View className="flex-row items-center gap-x-3">
          <Image
            source={icon}
            resizeMode="contain"
            className="size-7"
            tintColor={iconColor}
          />
          <Text
            className={cn(
              "base-semibold",
              label === "Logout" ? "text-red-600" : "text-black"
            )}
          >
            {label}
          </Text>
        </View>
        <Image
          source={images.arrowRight}
          resizeMode="contain"
          className="size-6"
          tintColor="#888"
        />
      </View>
    </Pressable>
  );
};

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
        <ScrollView
          className="flex-1 mt-4"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 pb-28 items-center mt-28 gap-y-4">
            <View className="relative items-center w-full pb-6">
              <Image
                source={{ uri: user?.avatar }}
                className="size-44 rounded-full -mt-24 mb-5 border-4 border-white"
                resizeMode="contain"
              />
              <Text className="text-center base-bold text-dark-100 !text-2xl mb-1">
                {user?.name}
              </Text>
              <Text className="font-quicksand-semibold text-gray-200 text-lg">
                {user?.email}
              </Text>
            </View>

            <View className="relative gap-y-1 items-center bg-white w-full py-4 rounded-2xl shadow-sm shadow-dark-100/30">
              <ProfileLinkItem
                icon={images.userLined}
                label="Personal Info"
                onPress={() => {}}
                iconColor="#fe4343"
              />
              <ProfileLinkItem
                icon={images.locations}
                label="Addresses"
                onPress={() => {}}
                iconColor="#4369fe"
              />
            </View>

            <View className="relative gap-y-1 items-center bg-white w-full py-4 rounded-2xl shadow-sm shadow-dark-100/30">
              <ProfileLinkItem
                icon={images.orders}
                label="Orders"
                onPress={() => {}}
                iconColor="#feba43"
              />
              <ProfileLinkItem
                icon={images.heart}
                label="Favourite"
                onPress={() => {}}
                iconColor="#fe4343"
              />
              <ProfileLinkItem
                icon={images.starOutlined}
                label="Reviews"
                onPress={() => {}}
                iconColor="#31cc2e"
              />
              <ProfileLinkItem
                icon={images.notification}
                label="Notifications"
                onPress={() => {}}
                iconColor="#fe9743"
              />
              <ProfileLinkItem
                icon={images.wallet}
                label="Wallet"
                onPress={() => {}}
                iconColor="#8e43fe"
              />
              <ProfileLinkItem
                icon={images.paymentCard}
                label="Payment Method"
                onPress={() => {}}
                iconColor="#439efe"
              />
            </View>

            <View className="relative gap-y-1 items-center bg-white w-full py-4 rounded-2xl shadow-sm shadow-dark-100/30">
              <ProfileLinkItem
                icon={images.faq}
                label="FAQ"
                onPress={() => {}}
                iconColor="#6c43fe"
              />
              <ProfileLinkItem
                icon={images.privacyPolicy}
                label="Privacy Policy"
                onPress={() => {}}
                iconColor="#fe8e43"
              />
              <ProfileLinkItem
                icon={images.logout}
                label="Logout"
                disabled={isSubmitting}
                onPress={logout}
                iconColor="#dc2626"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default profile;
