import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { CustomInputProps } from "@/type";
import cn from "clsx";

const CustomInput = ({
  placeholder = "Enter text",
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full">
      <Text className="mb-2 font-quicksand-bold text-base text-slate-500">
        {label}
      </Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={"#666"}
        className={cn(
          "p-3 w-full rounded-lg text-black font-quicksand-medium text-lg border-0 outline-0 ring-0 ",
          isFocused ? "bg-slate-100" : "bg-slate-50"
        )}
      />
    </View>
  );
};

export default CustomInput;
