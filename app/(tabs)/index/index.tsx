import { offers } from "@/constants";
import cn from "clsx";
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import images from "@/constants";
import CartButton from "@/components/CartButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
// import { useRef } from "react";
// import * as NavigationBar from "expo-navigation-bar";

export default function Index() {
  // const lastOffset = useRef(0);

  // const handleScroll = async (event: any) => {
  //   if (Platform.OS !== "android") return;
  //   const currentOffset = event.nativeEvent.contentOffset.y;
  //   const direction = currentOffset > lastOffset.current ? "down" : "up";

  //   if (direction === "down") {
  //     await NavigationBar.setVisibilityAsync("hidden");
  //   } else {
  //     await NavigationBar.setVisibilityAsync("visible");
  //   }
  //   lastOffset.current = currentOffset;
  // };

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex-row flex-between items-center px-5 my-5">
        <View>
          <Text className="small-bold uppercase text-primary">Deliver to:</Text>
          <TouchableOpacity
            className="flex-row items-center gap-x-1 mt-0.5"
            activeOpacity={0.9}
          >
            <Text className="paragraph-semibold text-dark-100">Kochi</Text>
            <Image
              source={images.arrowDown}
              resizeMode="contain"
              className="size-4"
            />
          </TouchableOpacity>
        </View>

        <CartButton />
      </View>

      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;

          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row" : "flex-row-reverse"
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#ffffff" }}
                onPress={() => router.push("../search")}
              >
                {({ pressed }) => (
                  <>
                    <View className="h-full w-1/2">
                      <Image
                        source={item.image}
                        className="size-full"
                        resizeMode="contain"
                      />
                    </View>
                    <View
                      className={cn("w-1/2 flex-1", isEven ? "pr-4" : "pl-4")}
                    >
                      <Text className="font-quicksand-bold uppercase text-white mb-2 text-2xl">
                        {item.title}
                      </Text>
                      <Text className="font-quicksand-bold leading-tight text-white text-lg">
                        {item.caption}
                      </Text>
                    </View>
                  </>
                )}
              </Pressable>
            </View>
          );
        }}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerClassName="pb-24 px-4"
        showsVerticalScrollIndicator={false}
        // onScroll={handleScroll}
        // IF NEEDED A FLATLIST HEADER TEXT
        // ListHeaderComponent={() => (
        //   <View className="items-center py-2 px-4">
        //     <Text className="font-quicksand-bold text-black text-2xl">
        //       Latest Offers
        //     </Text>
        //   </View>
        // )}
      />
    </SafeAreaView>
  );
}
