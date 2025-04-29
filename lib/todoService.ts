// lib/todoService.ts
import { databases, ID, account } from "./appwriteClient";
import { Query } from "appwrite"; // ✨ Import Query
import { Todo } from "@/types/todo";
import { Permission, Role } from "appwrite";
const DB_ID = "6809ec950019f827d359";
const COLLECTION_ID = "6809ed390027514bce10";

export const getTodos = async (): Promise<Todo[]> => {
  const currentUser = await account.get(); // ✨ get the current user dynamically
  const response = await databases.listDocuments(DB_ID, COLLECTION_ID, [
    Query.equal("user_id", currentUser.$id), // ✨ filter todos where user_id == logged-in user id
  ]);
  return response.documents as Todo[];
};

export const addTodo = async (title: string): Promise<Todo> => {
  const currentUser = await account.get(); // ensure it's inside function
  const response = await databases.createDocument(
    DB_ID,
    COLLECTION_ID,
    ID.unique(),
    {
      user_id: currentUser.$id,
      title,
      completed: false,
    },
    [
      Permission.read(Role.user(currentUser.$id)), // 👁️ only this user can read
      Permission.update(Role.user(currentUser.$id)), // ✏️ only this user can update
      Permission.delete(Role.user(currentUser.$id)), // 🗑️ only this user can delete
    ]
  );
  return response as Todo;
};
export const updateTodo = async (
  id: string,
  data: Partial<Todo>
): Promise<Todo> => {
  const response = await databases.updateDocument(
    DB_ID,
    COLLECTION_ID,
    id,
    data
  );
  return response as Todo;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await databases.deleteDocument(DB_ID, COLLECTION_ID, id);
};
