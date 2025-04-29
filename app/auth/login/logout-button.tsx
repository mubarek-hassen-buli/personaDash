"use client";

import { Button } from "@/components/ui/button";
import { account } from "@/lib/appwriteClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      toast.success("Logged out successfully!");
      router.push("/auth/login"); // Redirect to login page
    } catch (err: any) {
      toast.error("Failed to logout: " + err.message);
    }
  };

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  );
}
