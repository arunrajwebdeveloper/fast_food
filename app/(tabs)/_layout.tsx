import useAuthStore from "@/store/auth.store";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import images from "@/constants";
import cn from "clsx";

const TabBarIcon = ({ focused, icon, title }: any) => (
  <View className="tab-icon">
    <Image
      source={icon}
      className="size-7"
      resizeMode="contain"
      tintColor={focused ? "#f97316" : "#5D5F6D"}
    />
    <Text
      className={cn(
        "text-xs text-center w-full",
        focused ? "text-orange-500" : "text-black"
      )}
    >
      {title}
    </Text>
  </View>
);

const _layout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <>
      {/* <StatusBar hidden={true} /> */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderRadius: 50,
            marginHorizontal: 20,
            height: 70,
            position: "absolute",
            bottom: 50,
            backgroundColor: "white",
            shadowColor: "#1a1a1a",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
          },
        }}
      >
        <Tabs.Screen
          name="index/index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon title="Home" icon={images.home} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                title="Search"
                icon={images.magnifer}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon title="Cart" icon={images.bag} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                title="Profile"
                icon={images.user}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default _layout;
