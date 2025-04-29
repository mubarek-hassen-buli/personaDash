import { databases, ID, account } from "./appwriteClient";
import { Query } from "appwrite";
const DB_ID = "6809ec950019f827d359";
const COLLECTION_ID = "68107b48002938a376de";

export const getSpotifyDocumentForUser = async (userId: string) => {
  const currentUser = await account.get(); // must be awaited!

  try {
    const response = await databases.listDocuments(DB_ID, COLLECTION_ID, [
      Query.equal("user_id", userId),
      Query.limit(1),
    ]);

    if (response.total > 0) {
      return response.documents[0]; // Return the first match
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching Spotify document:", error);
    return null;
  }
};

export const updateSpotifyUrl = async (userId: string, url: string) => {
  try {
    // Try to update first (if it exists)
    const existing = await getSpotifyDocumentForUser(userId);
    if (existing) {
      await databases.updateDocument(DB_ID, COLLECTION_ID, existing.$id, {
        url,
      });
    } else {
      // Create new one with auto ID
      await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
        user_id: userId,
        url,
      });
    }
  } catch (error) {
    console.error("Spotify update error:", error);
    throw error;
  }
};

export const getSpotifyUrl = async (userId: string): Promise<string | null> => {
  try {
    const doc = await databases.getDocument(DB_ID, COLLECTION_ID, userId);
    return doc.url || null;
  } catch {
    return null;
  }
};
