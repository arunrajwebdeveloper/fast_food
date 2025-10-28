import CartButton from "@/components/CartButton";
import { getCategories, getMenu } from "@/lib/appwrite";
import cn from "clsx";
import useAppwrite from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuCard from "@/components/MenuCard";
import { Category, MenuItem } from "@/type";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/Filter";

const limit = 6;

const menu = () => {
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

  const handleProductPress = (productId: string) => {
    // Navigate using the relative path within the 'search' directory
    router.push({
      pathname: "/search/[productId]",
      params: { productId },
    });
  };

  return (
    <SafeAreaView className="bg-white h-full">
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
            <Text className="text-center mt-10 font-quicksand-bold text-lg text-slate-400">
              No Result
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default menu;
