import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import { useState } from "react";
import { View, Text, Alert } from "react-native";
import * as Sentry from "@sentry/react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    const { name, email, password } = form;

    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword)
      return Alert.alert(
        "Error",
        "Can't be empty Full name, email and password"
      );

    setIsSubmitting(true);

    try {
      await createUser({
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });

      Alert.alert("Success", "User signed in successfully");
      router.replace("./");
    } catch (err: any) {
      Alert.alert("Error", err?.message);
      Sentry.captureEvent(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="px-4 py-10 gap-y-4">
      {/* <Text className="text-black font-quicksand-bold text-3xl">SignUp</Text> */}
      <CustomInput
        placeholder="Enter your name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Full name"
      />
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
        style="mt-2"
        title="Sign Up"
        isLoading={isSubmitting}
        onPress={submit}
      />

      <View className="items-center flex-row justify-center mt-4 gap-x-2">
        <Text className="font-quicksand-medium text-base text-black">
          Already have an account?
        </Text>
        <Link
          className="font-quicksand-bold text-base text-amber-500"
          href="/sign-in"
        >
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
