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
    <View className="w-full relative pt-3">
      {label && (
        <Text
          className={cn(
            "absolute bg-white z-10 left-4 px-2 font-quicksand-semibold text-lg",
            isFocused ? "text-emerald-600" : "text-slate-600"
          )}
        >
          {label}
        </Text>
      )}
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
          "p-5 w-full rounded-lg text-black font-quicksand-semibold text-lg border outline-0 ring-0 ",
          isFocused ? " border-emerald-600" : " border-slate-300"
        )}
      />
    </View>
  );
};

export default CustomInput;
