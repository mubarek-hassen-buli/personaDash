import { Client, Account, Databases, Storage, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
const databases = new Databases(client);
export { databases, ID };
export const storage = new Storage(client);

// const createAccount = async (email, password) => {
//   try {
//     const response = await account.create(ID.unique(), email, password);
//     console.log("User registered:", response);
//   } catch (error) {
//     console.error("Registration error:", error);
//   }
// };
// const login = async (email, password) => {
//   try {
//     const session = await account.createEmailSession(email, password);
//     console.log("User logged in:", session);
//   } catch (error) {
//     console.error("Login error:", error);
//   }
// };
// const getCurrentUser = async () => {
//   try {
//     const user = await account.get();
//     console.log("Current user:", user);
//   } catch (error) {
//     console.error("No user logged in:", error);
//   }
// };
// const logout = async () => {
//   try {
//     await account.deleteSession("current");
//     console.log("User logged out");
//   } catch (error) {
//     console.error("Logout error:", error);
//   }
// };
