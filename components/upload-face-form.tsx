"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { storage, databases } from "@/lib/appwriteClient";
import { useUser } from "@/lib/useUser";
import { toast } from "sonner";
import { loadModels, getFaceDescriptor } from "@/lib/faceRecognition";
import * as faceapi from "face-api.js";

export default function UploadFaceForm() {
  const [file, setFile] = useState<File | null>(null);
  const { user } = useUser();
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    loadModels().then(() => console.log("✅ Face-api models loaded!"));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !user) {
      toast.error("Please select a file and login first.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = async () => {
          const descriptor = await getFaceDescriptor(img);

          if (!descriptor) {
            toast.error("No face detected. Please try another image.");
            return;
          }

          console.log("✅ Face descriptor:", descriptor);

          // Upload the image to Appwrite Storage
          const uploadedFile = await storage.createFile("face_images", file);

          // Save the descriptor + userId + imageId to Appwrite Database
          await database.createDocument("faceDB", "faces", "unique()", {
            userId: user.$id,
            imageId: uploadedFile.$id,
            descriptor: JSON.stringify(Array.from(descriptor)),
          });

          toast.success("Face uploaded and saved!");
        };
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      toast.error("Upload failed");
      console.error(err);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Your Face</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button className="w-full mt-4" onClick={handleUpload} disabled={!file}>
        Upload & Save Face
      </Button>
    </Card>
  );
}
