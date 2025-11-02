import { Stack } from "expo-router";

export default function SearchStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Cart",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          title: "Checkout",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
