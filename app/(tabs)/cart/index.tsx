import CustomHeader from "@/components/CustomHeader";
import { useCartStore } from "@/store/cart.store";
import cn from "clsx";
import { PaymentInfoStripeProps } from "@/type";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import CartItem from "@/components/CartItem";
import images from "@/constants";
import PageMessage from "@/components/PageMessage";
import { router } from "expo-router";

const PaymentInfoStripe = ({
  label,
  value,
  labelStyle,
  valueStyle,
}: PaymentInfoStripeProps) => (
  <View className="flex-between flex-row my-1">
    <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
      {label}
    </Text>
    <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
      {value}
    </Text>
  </View>
);

const index = () => {
  const { items, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <SafeAreaView className="bg-slate-50 h-full px-5 pt-5">
      <CustomHeader title="Your Cart" />
      <View className="mt-5 flex-1">
        <FlatList
          data={items}
          renderItem={({ item }) => <CartItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerClassName="pb-28 pt-5"
          // ListHeaderComponent={() => (
          //   <View>
          //     <View className="flex-row flex-between items-center mb-6 mt-10">
          //       <View>
          //         <Text className="small-bold uppercase text-primary">
          //           Delivery Address
          //         </Text>

          //         <Text className="paragraph-bold text-dark-100">Home</Text>
          //       </View>
          //       <TouchableOpacity
          //         className="py-3 px-4 border border-orange-500 rounded-full"
          //         activeOpacity={0.9}
          //       >
          //         <Text className="paragraph-bold text-orange-500 text-sm">
          //           Change Address
          //         </Text>
          //       </TouchableOpacity>
          //     </View>
          //   </View>
          // )}
          ListEmptyComponent={() => (
            <PageMessage
              image={images.cartEmpty}
              title="Your Cart is Empty"
              description="Looks like you haven't added anything to your cart yet."
              linkUrl="/search"
              linkText="Continue shopping"
            />
          )}
          ListFooterComponent={() =>
            totalItems > 0 && (
              <View className="gap-5 ">
                <View className="mt-2 bg-white p-5 rounded-2xl shadow-md shadow-dark-100/30">
                  <Text className="h3-bold text-dark-100 mb-5">
                    Payment Summary
                  </Text>
                  <PaymentInfoStripe
                    label={`Total Items (${totalItems})`}
                    value={`$${totalPrice.toFixed(2)}`}
                  />
                  <PaymentInfoStripe label={`Delivery Fee`} value={`$5.00`} />
                  <PaymentInfoStripe
                    label={`Discount`}
                    value={`- $0.50`}
                    valueStyle="!text-success"
                  />
                  <View className="border-t border-gray-50 my-2" />
                  <PaymentInfoStripe
                    label={`Total`}
                    value={`$${(totalPrice + 5 - 0.5).toFixed(2)}`}
                    labelStyle="base-bold !text-dark-100"
                    valueStyle="base-bold !text-dark-100 !text-right"
                  />
                </View>

                <CustomButton
                  title="Checkout"
                  onPress={() => router.push("/cart/checkout")}
                />
              </View>
            )
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default index;
