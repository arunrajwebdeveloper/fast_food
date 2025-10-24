import { offers } from "@/constants";
import cn from "clsx";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import images from "@/constants";
import CartButton from "@/components/CartButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-4 py-4">
        <View>
          <Text className="text-orange-500 uppercase text-sm font-quicksand-bold">
            Deliver to:
          </Text>
          <TouchableOpacity className="flex-row items-center gap-x-1">
            <Text className="font-quicksand-bold text-base">Kochi</Text>
            <Image
              source={images.arrowDownFill}
              resizeMode="contain"
              className="size-3"
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
              >
                {({ pressed }) => (
                  <>
                    <View className="h-full w-1/2">
                      <Image
                        source={item.image}
                        className="size-full"
                        resizeMode="contain"
                        // tintColor="#ffffff"
                      />
                    </View>
                    <View
                      className={cn("w-1/2 flex-1", isEven ? "pr-4" : "pl-4")}
                    >
                      <Text className="font-quicksand-bold uppercase text-white mb-2 text-2xl">
                        {item.title}
                      </Text>
                      <Text className="font-quicksand-bold leading-tight text-white text-xl">
                        From $20
                      </Text>
                    </View>
                  </>
                )}
              </Pressable>
            </View>
          );
        }}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerClassName="pb-28 px-4"
        // IF NEEDED A FLATLIST HEADER TEXT
        ListHeaderComponent={() => (
          <View className="items-center py-2 px-4">
            <Text className="font-quicksand-bold text-black text-2xl">
              Latest Offers
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
