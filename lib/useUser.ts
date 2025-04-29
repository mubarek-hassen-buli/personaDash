// lib/useUser.ts
import { useEffect, useState } from "react";
import { account } from "./appwriteClient";

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 Add loading flag

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await account.get();
        console.log("✅ User fetched:", currentUser);
        setUser(currentUser);
      } catch (err) {
        console.log("⛔ No user session");
        setUser(null);
      } finally {
        setLoading(false); // 👈 Set loading false after attempt
      }
    };

    getUser();
  }, []);

  return { user, loading }; // 👈 Return loading
}
