import { ID } from "react-native-appwrite";
import { appwriteConfig, tablesDB, storage } from "./appwrite";
import dummyData from "./data";

interface Category {
  name: string;
  description: string;
}

interface Customization {
  name: string;
  price: number;
  type: "topping" | "side" | "size" | "crust" | string; // extend as needed
}

interface MenuItem {
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  category_name: string;
  customizations: string[]; // list of customization names
}

interface DummyData {
  categories: Category[];
  customizations: Customization[];
  menu: MenuItem[];
}

// ensure dummyData has correct shape
const data = dummyData as DummyData;

async function clearAll(collectionId: string): Promise<void> {
  const list = await tablesDB.listRows({
    databaseId: appwriteConfig.databaseId,
    tableId: collectionId,
  });

  await Promise.all(
    list.rows.map((doc) =>
      tablesDB.deleteRow({
        databaseId: appwriteConfig.databaseId,
        tableId: collectionId,
        rowId: doc.$id,
      })
    )
  );
}

async function clearStorage(): Promise<void> {
  const list = await storage.listFiles({ bucketId: appwriteConfig.bucketId });

  await Promise.all(
    list.files.map((file: any) =>
      storage.deleteFile({
        bucketId: appwriteConfig.bucketId,
        fileId: file.$id,
      })
    )
  );
}

// async function uploadImageToStorage(imageUrl: string) {
//   // const response = await fetch(imageUrl);
//   // const blob = await response.blob();

//   // const fileObj = {
//   //   name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
//   //   type: blob.type,
//   //   size: blob.size,
//   //   uri: imageUrl,
//   // };

//   // const file = await storage.createFile({
//   //   bucketId: appwriteConfig.bucketId,
//   //   fileId: ID.unique(),
//   //   file: fileObj,
//   // });

//   // return storage.getFileViewURL(appwriteConfig.bucketId, file.$id);
//   //return storage.getFileViewURL(appwriteConfig.bucketId, file.$id);

//   const getFile = await storage.getFile({
//     bucketId: appwriteConfig.bucketId,
//     fileId: "68ff0002000572231061",
//   });

//   console.log("getFile :>> ", JSON.stringify(getFile, null, 2));
// }

async function seed(): Promise<void> {
  // 1. Clear all
  await clearAll(appwriteConfig.categoriesCollection);
  await clearAll(appwriteConfig.customizationsCollection);
  await clearAll(appwriteConfig.menuCollection);
  await clearAll(appwriteConfig.menuCustomizationsCollection);
  await clearStorage();

  // // 2. Create Categories
  const categoryMap: Record<string, string> = {};
  for (const cat of data.categories) {
    const doc = await tablesDB.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.categoriesCollection,
      rowId: ID.unique(),
      data: {
        name: cat.name,
        description: cat.description,
      },
    });
    categoryMap[cat.name] = doc.$id;
  }

  // 3. Create Customizations
  const customizationMap: Record<string, string> = {};
  for (const cus of data.customizations) {
    const doc = await tablesDB.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.customizationsCollection,
      rowId: ID.unique(),
      data: {
        name: cus.name,
        price: cus.price,
        type: cus.type,
      },
    });
    customizationMap[cus.name] = doc.$id;
  }

  // // 4. Create Menu Items
  const menuMap: Record<string, string> = {};
  for (const item of data.menu) {
    // const uploadedImage = await uploadImageToStorage(item.image_url);
    const doc = await tablesDB.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.menuCollection,
      rowId: ID.unique(),
      data: {
        name: item.name,
        description: item.description,
        image_url: "https://fra.cloud.appwrite.io/v1",
        price: item.price,
        rating: item.rating,
        calories: item.calories,
        protein: item.protein,
        categories: categoryMap[item.category_name],
      },
    });
    menuMap[item.name] = doc.$id;
    // 5. Create menu_customizations
    for (const cusName of item.customizations) {
      await tablesDB.createRow({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.menuCustomizationsCollection,
        rowId: ID.unique(),
        data: {
          menu: doc.$id,
          customizations: customizationMap[cusName],
        },
      });
    }
  }

  console.log("✅ Seeding complete.");
}

export default seed;
