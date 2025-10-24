import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./global.css";

export default function RootLayout() {
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

  return <Stack screenOptions={{ headerShown: false }} />;
}
