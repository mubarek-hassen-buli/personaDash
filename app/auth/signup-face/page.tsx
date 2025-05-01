"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/appwriteClient"; // ✅ Make sure storage is exported
import { ID } from "appwrite";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SignupFace() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an image first.");
      return;
    }

    try {
      setIsUploading(true);
      const response = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
        ID.unique(),
        file
      );
      console.log("✅ Upload success:", response);
      toast.success("Image uploaded successfully!");
      router.push("/dashboard"); // ✅ Redirect to login after upload
    } catch (err: any) {
      console.error("❌ Upload error:", err);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">
          Upload Your Face
        </h2>

        <Input type="file" accept="image/*" onChange={handleFileChange} />

        <Button
          className="w-full"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload & Continue"}
        </Button>

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => router.push("/dashboard")}
        >
          Skip for now
        </Button>
      </Card>
    </div>
  );
}
