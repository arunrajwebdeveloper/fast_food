import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./global.css";
import * as Sentry from "@sentry/react-native";
import * as NavigationBar from "expo-navigation-bar";
import useAuthStore from "@/store/auth.store";
import { Platform, StatusBar } from "react-native";

Sentry.init({
  dsn: "https://48e5582b89f882d33e7d7bbc817c91da@o4510253942243328.ingest.us.sentry.io/4510253945454593",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();

  const [fontsLoaded, error] = useFonts({
    "Quicksand-Regular": require("@/assets/fonts/QuicksandRegular.ttf"),
    "Quicksand-Bold": require("@/assets/fonts/QuicksandBold.ttf"),
    "Quicksand-Semibold": require("@/assets/fonts/QuicksandSemiBold.ttf"),
    "Quicksand-Light": require("@/assets/fonts/QuicksandLight.ttf"),
    "Quicksand-Medium": require("@/assets/fonts/QuicksandMedium.ttf"),
  });

  // AFTER LOAD FONTS THE SPLASH SCREEN WILL HIDE
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  useEffect(() => {
    async function setup() {
      if (Platform.OS !== "android") return;

      // Set bottom bar color
      // await NavigationBar.setBackgroundColorAsync("#000000");

      // Set bottom bar hidden
      // await NavigationBar.setVisibilityAsync("hidden");

      // await NavigationBar.setBehaviorAsync("inset-swipe"); // <-- auto-hide until swipe

      // Optional: make icons light/dark
      await NavigationBar.setButtonStyleAsync("dark");
    }
    setup();
  }, []);

  if (!fontsLoaded || isLoading) return null;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
});
