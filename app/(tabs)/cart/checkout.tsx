import CustomHeader from "@/components/CustomHeader";
import { useCartStore } from "@/store/cart.store";
import cn from "clsx";
import { PaymentInfoStripeProps } from "@/type";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import CartItem from "@/components/CartItem";
import images, { addresses } from "@/constants";
import PageMessage from "@/components/PageMessage";
import { useState } from "react";

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

const checkout = () => {
  const { items, getTotalItems, getTotalPrice } = useCartStore();

  const [deliveryAddress, setDeliveryAddress] = useState("home");
  const [payMethod, setPayMethod] = useState("card");

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <SafeAreaView className="bg-slate-50 h-full px-5 pt-5">
      <CustomHeader title="Checkout" />
      <View className="mt-5 flex-1">
        <FlatList
          data={items}
          renderItem={({ item }) => <CartItem item={item} isCheckout={true} />}
          keyExtractor={(item) => item.id}
          contentContainerClassName="pb-28 pt-6"
          // ListHeaderComponent={() => (
          //   <Text>Hi</Text>
          // )}
          ListEmptyComponent={() => (
            <PageMessage
              image={images.cartEmpty}
              title="Your Cart is Empty"
              description="Looks like you haven't added anything to your cart yet."
              linkUrl="/search/menu"
              linkText="Continue shopping"
            />
          )}
          ListFooterComponent={() =>
            totalItems > 0 && (
              <View className="gap-5 ">
                <View className="mt-6 bg-white p-5 rounded-2xl shadow-md shadow-dark-100/30">
                  <Text className="h3-bold text-dark-100 mb-5">
                    Choose Delivery Address
                  </Text>
                  <View className="gap-y-8">
                    {addresses?.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => setDeliveryAddress(item.id)}
                        activeOpacity={0.9}
                        className="flex-row gap-x-5 items-center"
                      >
                        <View
                          className={cn(
                            "size-7 rounded-full border-2 relative",
                            deliveryAddress === item.id
                              ? "border-green-500"
                              : "border-slate-400"
                          )}
                        >
                          {deliveryAddress === item.id && (
                            <Image
                              source={images.tickCircle}
                              resizeMode="contain"
                              className="size-7 rounded-full absolute z-10 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
                            />
                          )}
                        </View>

                        <View className="flex-1">
                          <Text className="font-quicksand-bold text-black mb-2">
                            {item.label}
                          </Text>
                          <Text className="paragraph-medium text-gray-200">
                            {item.address}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View className="mt-6 bg-white p-5 rounded-2xl shadow-md shadow-dark-100/30">
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

                <View className="mt-6 bg-white p-5 rounded-2xl shadow-md shadow-dark-100/30">
                  <Text className="h3-bold text-dark-100 mb-5">
                    Choose Payment Method
                  </Text>

                  <View className="gap-y-3">
                    <TouchableOpacity
                      onPress={() => setPayMethod("card")}
                      activeOpacity={0.9}
                      className="flex-between flex-row gap-x-2 items-center py-4"
                    >
                      <View className="flex-1 flex-row items-center gap-x-4">
                        <View
                          className={cn(
                            "size-7 rounded-full border-2 relative",
                            payMethod === "card"
                              ? "border-green-500"
                              : "border-slate-400"
                          )}
                        >
                          {payMethod === "card" && (
                            <Image
                              source={images.tickCircle}
                              resizeMode="contain"
                              className="size-7 rounded-full absolute z-10 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
                            />
                          )}
                        </View>
                        <Text className={cn("base-bold text-gray-500")}>
                          Debit / Credit Card
                        </Text>
                      </View>

                      <Image
                        source={images.debitCard}
                        resizeMode="contain"
                        className="w-6 h-6"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setPayMethod("bank")}
                      activeOpacity={0.9}
                      className="flex-between flex-row gap-x-2 items-center py-4"
                    >
                      <View className="flex-1 flex-row items-center gap-x-4">
                        <View
                          className={cn(
                            "size-7 rounded-full border-2 relative",
                            payMethod === "bank"
                              ? "border-green-500"
                              : "border-slate-400"
                          )}
                        >
                          {payMethod === "bank" && (
                            <Image
                              source={images.tickCircle}
                              resizeMode="contain"
                              className="size-7 rounded-full absolute z-10 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
                            />
                          )}
                        </View>
                        <Text className={cn("base-bold text-gray-500")}>
                          Internet Banking
                        </Text>
                      </View>

                      <Image
                        source={images.netBanking}
                        resizeMode="contain"
                        className="w-6 h-6"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setPayMethod("gpay")}
                      activeOpacity={0.9}
                      className="flex-between flex-row gap-x-2 items-center py-4"
                    >
                      <View className="flex-1 flex-row items-center gap-x-4">
                        <View
                          className={cn(
                            "size-7 rounded-full border-2 relative",
                            payMethod === "gpay"
                              ? "border-green-500"
                              : "border-slate-400"
                          )}
                        >
                          {payMethod === "gpay" && (
                            <Image
                              source={images.tickCircle}
                              resizeMode="contain"
                              className="size-7 rounded-full absolute z-10 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
                            />
                          )}
                        </View>
                        <Text className={cn("base-bold text-gray-500")}>
                          Gpay
                        </Text>
                      </View>

                      <Image
                        source={images.gpay}
                        resizeMode="contain"
                        className="w-14 h-6"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setPayMethod("phonepe")}
                      activeOpacity={0.9}
                      className="flex-between flex-row gap-x-2 items-center py-4"
                    >
                      <View className="flex-1 flex-row items-center gap-x-4">
                        <View
                          className={cn(
                            "size-7 rounded-full border-2 relative",
                            payMethod === "phonepe"
                              ? "border-green-500"
                              : "border-slate-400"
                          )}
                        >
                          {payMethod === "phonepe" && (
                            <Image
                              source={images.tickCircle}
                              resizeMode="contain"
                              className="size-7 rounded-full absolute z-10 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
                            />
                          )}
                        </View>
                        <Text className={cn("base-bold text-gray-500")}>
                          PhonePe
                        </Text>
                      </View>

                      <Image
                        source={images.phonepe}
                        resizeMode="contain"
                        className="w-6 h-6"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {}}
                      activeOpacity={0.9}
                      className="flex-row justify-center gap-x-2 items-center py-3 bg-slate-50 rounded-xl mt-4"
                    >
                      <Image
                        source={images.plus}
                        resizeMode="contain"
                        className="w-5 h-5"
                        tintColor="#9ca3af"
                      />
                      <Text className={cn("base-bold text-gray-400")}>
                        Add another method
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <CustomButton
                  title={`Pay now ($${(totalPrice + 5 - 0.5).toFixed(2)})`}
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

export default checkout;
