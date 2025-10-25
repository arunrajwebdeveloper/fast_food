import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import { useState } from "react";
import { View, Text, Button, Alert } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    if (!form.email || !form.password)
      return Alert.alert("Error", "Please enter valid email & password");

    setIsSubmitting(true);

    try {
      Alert.alert("Success", "User signed in successfully");
      router.replace("/");
    } catch (err: any) {
      Alert.alert("Error", err?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="px-4 py-10 gap-y-4">
      {/* <Text className="text-black font-quicksand-bold text-3xl">SignIn</Text> */}
      <CustomInput
        placeholder="Enter email address"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton
        className="mt-2"
        title="Sign In"
        isLoading={isSubmitting}
        onPress={submit}
      />

      <View className="items-center flex-row justify-center mt-4 gap-x-2">
        <Text className="font-quicksand-medium text-base text-black">
          Don't have an account?
        </Text>
        <Link
          className="font-quicksand-bold text-base text-amber-500"
          href="/sign-up"
        >
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
