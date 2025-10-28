import { Stack } from "expo-router";

export default function SearchStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="menu"
        options={{
          title: "Menu",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[productId]"
        options={{
          title: "Food Details",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
