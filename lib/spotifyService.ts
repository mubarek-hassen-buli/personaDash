import { databases, ID } from "./appwriteClient";

const DB_ID = "6809ec950019f827d359";
const COLLECTION_ID = "68107b48002938a376de";

export const updateSpotifyUrl = async (userId: string, url: string) => {
  try {
    const docId = userId; // use user ID as document ID for simplicity
    await databases.updateDocument(DB_ID, COLLECTION_ID, docId, { url });
  } catch (err) {
    // if document doesn't exist, create it
    await databases.createDocument(DB_ID, COLLECTION_ID, userId, {
      user_id: userId,
      url,
    });
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
