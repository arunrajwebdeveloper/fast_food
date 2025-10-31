import CartButton from "@/components/CartButton";
import { getCategories, getMenu } from "@/lib/appwrite";
import cn from "clsx";
import useAppwrite from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuCard from "@/components/MenuCard";
import { Category, MenuItem } from "@/type";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/Filter";
import images from "@/constants";
import PageMessage from "@/components/PageMessage";
// import * as NavigationBar from "expo-navigation-bar";

const limit = 6;

const menu = () => {
  // const lastOffset = useRef(0);

  const [refreshing, setRefreshing] = useState(false);

  const { query, category } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();

  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: {
      category,
      query,
      limit,
    },
  });

  const { data: categories } = useAppwrite({
    fn: getCategories,
  });

  useEffect(() => {
    refetch({ category, query, limit });
  }, [category, query]);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await refetch({ category, query, limit });
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleProductPress = (productId: string) => {
    router.push({
      pathname: "/search/[productId]",
      params: { productId },
    });
  };

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

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={50} color="#f97316" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-slate-50 h-full">
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;

          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                !isFirstRightColItem ? "mt-10" : "mt-0"
              )}
            >
              <MenuCard item={item as MenuItem} onPress={handleProductPress} />
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-row w-full flex-between">
              <View className="items-start">
                <Text className="small-bold uppercase text-primary">
                  Search
                </Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">
                    Find your favourite food
                  </Text>
                </View>
              </View>
              <CartButton />
            </View>

            <SearchBar />
            <Filter categories={categories as Category[]} />
          </View>
        )}
        ListEmptyComponent={() =>
          !loading && (
            <PageMessage
              image={images.searchNotFound}
              title="No Result found"
              description="Try a different search term or check typo."
            />
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#f97316" // iOS spinner color
            colors={["#f97316", "#2563eb"]} // Android spinner colors (can be multiple)
            progressBackgroundColor="#FFFFFF" // Android background behind spinner
            progressViewOffset={30} // distance from top
          />
        }
        showsVerticalScrollIndicator={false}
        // onScroll={handleScroll}
      />
    </SafeAreaView>
  );
};

export default menu;
