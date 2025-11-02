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

const AddressItem = ({ item, value, onPress }: any) => {
  const { id, label, address } = item;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="flex-row gap-x-5 items-center"
    >
      <View
        className={cn(
          "size-7 rounded-full border-2 relative",
          value === id ? "border-green-500" : "border-slate-400"
        )}
      >
        {value === id && (
          <Image
            source={images.tickCircle}
            resizeMode="contain"
            className="size-7 rounded-full absolute z-10 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
          />
        )}
      </View>
      <View className="flex-1">
        <Text className="font-quicksand-bold text-black mb-2">{label}</Text>
        <Text className="paragraph-medium text-gray-200">{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const PaymentItem = ({ isSelected, label, icon, iconStyle, onPress }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="flex-between flex-row gap-x-2 items-center py-4"
    >
      <View className="flex-1 flex-row items-center gap-x-4">
        <View
          className={cn(
            "size-7 rounded-full border-2 relative",
            isSelected ? "border-green-500" : "border-slate-400"
          )}
        >
          {isSelected && (
            <Image
              source={images.tickCircle}
              resizeMode="contain"
              className="size-7 rounded-full absolute z-10 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
            />
          )}
        </View>
        <Text className={cn("base-bold text-gray-500")}>{label}</Text>
      </View>

      <Image source={icon} resizeMode="contain" className={iconStyle} />
    </TouchableOpacity>
  );
};

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
                      <AddressItem
                        key={item.id}
                        item={item}
                        value={deliveryAddress}
                        onPress={() => setDeliveryAddress(item.id)}
                      />
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
                    <PaymentItem
                      isSelected={payMethod === "card"}
                      label="Debit / Credit Card"
                      iconStyle="w-6 h-6"
                      icon={images.debitCard}
                      onPress={() => setPayMethod("card")}
                    />
                    <PaymentItem
                      isSelected={payMethod === "bank"}
                      label="Internet Banking"
                      iconStyle="w-6 h-6"
                      icon={images.netBanking}
                      onPress={() => setPayMethod("bank")}
                    />
                    <PaymentItem
                      isSelected={payMethod === "gpay"}
                      label="Gpay"
                      iconStyle="w-14 h-6"
                      icon={images.gpay}
                      onPress={() => setPayMethod("gpay")}
                    />
                    <PaymentItem
                      isSelected={payMethod === "phonepe"}
                      label="PhonePe"
                      iconStyle="w-6 h-6"
                      icon={images.phonepe}
                      onPress={() => setPayMethod("phonepe")}
                    />

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
