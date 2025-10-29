import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import cn from "clsx";
import images from "@/constants";

const Accordion = ({
  isOpened = false,
  content,
  title,
}: {
  isOpened?: boolean;
  content: string;
  title: string;
}) => {
  const [isOpen, setIsOpen] = useState(isOpened);

  return (
    <View>
      <Pressable
        onPress={() => setIsOpen((prev) => !prev)}
        className="mb-4 py-4 flex-row items-center justify-between gap-4"
      >
        <Text className="base-bold text-slate-700 !text-xl" numberOfLines={1}>
          {title}
        </Text>
        <Image
          source={images.arrowDown}
          className={cn(
            "size-5 mr-4 transition duration-200",
            isOpen ? "-rotate-180" : "rotate-0"
          )}
          resizeMode="contain"
        />
      </Pressable>
      {isOpen && <Text className="paragraph-medium pb-3">{content}</Text>}
    </View>
  );
};

export default Accordion;
