import { appwriteConfig } from "@/lib/appwrite";
import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import { Text, TouchableOpacity, Image, Platform } from "react-native";

const MenuCard = ({
  item: { $id, image_url, name, price },
  onPress,
}: {
  item: MenuItem;
  onPress: (id: string) => void;
}) => {
  const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`;

  const { addItem } = useCartStore();

  return (
    <TouchableOpacity
      onPress={() => onPress($id)}
      className="menu-card"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
    >
      <Image
        source={{ uri: imageUrl }}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />
      <Text
        className="text-center base-bold text-dark-100 mb-2"
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text className="font-quicksand-semibold text-gray-200 mb-4">{`From $${price}`}</Text>

      <TouchableOpacity
        onPress={() =>
          addItem({
            id: $id,
            name,
            price,
            image_url: imageUrl,
            customizations: [],
          })
        }
      >
        <Text className="paragraph-bold text-primary">Add to Cart + </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
