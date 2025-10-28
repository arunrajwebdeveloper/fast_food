import { CreateUserParams, GetMenuParams, SignInParams, User } from "@/type";
import {
  Account,
  Avatars,
  Client,
  ID,
  Query,
  Storage,
  TablesDB,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: "com.native.food_order",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "68fb92fa000d23756414",
  bucketId: "68fe38b3001db157f0aa",
  userCollection: "user",
  categoriesCollection: "68fe4e0f000e52b2a96c",
  menuCollection: "menu",
  customizationsCollection: "customizations",
  menuCustomizationsCollection: "menu_customizations",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);

const avatars = new Avatars(client);

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create({
      userId: ID.unique().toString(),
      email,
      password,
      name,
    });

    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await tablesDB.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.userCollection,
      rowId: ID.unique(),
      data: {
        email,
        name,
        accountId: newAccount.$id,
        avatar: avatarUrl,
      },
    });
  } catch (err) {
    throw new Error(err as string);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    await account.createEmailPasswordSession({
      email,
      password,
    });
  } catch (err) {
    throw new Error(err as string);
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession({
      sessionId: "current",
    });
  } catch (err) {
    throw new Error(err as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await tablesDB.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.userCollection,
      queries: [Query.equal("accountId", currentAccount.$id)],
    });

    if (!currentUser) throw Error;
    return currentUser.rows[0];
  } catch (err) {
    throw new Error(err as string);
  }
};

export const getCategories = async () => {
  try {
    const categories = await tablesDB.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.categoriesCollection,
    });

    return categories.rows;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));

    const menus = await tablesDB.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.menuCollection,
      queries,
    });

    return menus.rows;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const getFoodDetails = async ({ productId }: { productId: string }) => {
  try {
    const result = await tablesDB.getRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.menuCollection,
      rowId: productId,
    });

    return result;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const getCategory = async ({ categoryId }: { categoryId: string }) => {
  try {
    const result = await tablesDB.getRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.categoriesCollection,
      rowId: categoryId,
    });

    return result;
  } catch (err) {
    throw new Error(err as string);
  }
};
