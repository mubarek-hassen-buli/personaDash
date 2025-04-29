"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwriteClient";
import { toast } from "sonner";
import { useUser } from "@/lib/useUser";
import { ID } from "appwrite";
export default function SignupForm() {
  const router = useRouter();
  // const user = useUser();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ✅ Redirect if already logged in
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [router, user, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Trying to create account...");
      const result = await account.create(ID.unique(), email, password);
      console.log("Account created:", result);
      toast.success("Signup successful! Please upload your face.");
      // router.push("/auth/signup-face");
      router.push("/auth/login");
    } catch (err: any) {
      console.error("Signup error:", err);
      toast.error(err.message);
    }
  };

  return (
    <Card className="p-0 max-w-sm w-full shadow-none border-none">
      <MagicCard
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        className="p-0"
      >
        <CardHeader className="border-b border-border p-7 [.border-b]:pb-7">
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Fill in your details to get started</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <CardFooter className="p-0 mt-4">
              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </MagicCard>
    </Card>
  );
}
