"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwriteClient";
import { useUser } from "@/lib/useUser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  // const user = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Redirect if already logged in
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [router, user, loading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.createEmailPasswordSession(email.trim(), password.trim());
      toast.success("Login successful!");

      router.push("/auth/signup-face");
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  const handleFaceLoginRedirect = () => {
    router.push("/FaceLogin");
  };
  return (
    <form onSubmit={handleLogin}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-sm p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="mt-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full mt-4" type="submit">
            Login
          </Button>
          <div className="my-4 text-center text-gray-400">OR</div>

          <Button
            className="w-full"
            type="button"
            variant="outline"
            onClick={handleFaceLoginRedirect}
          >
            Login with Face
          </Button>
        </Card>
      </div>
    </form>
  );
}
