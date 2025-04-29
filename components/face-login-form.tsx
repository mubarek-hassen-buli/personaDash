"use client";

import { useEffect, useRef, useState } from "react";
import { loadModels, getFaceDescriptor } from "@/lib/faceRecognition";
import { storage, databases, account } from "@/lib/appwriteClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import * as faceapi from "face-api.js";

export default function FaceLoginForm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const startCamera = async () => {
      await loadModels();
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsReady(true);
      } catch (err) {
        console.error(err);
        toast.error("Failed to access webcam.");
      }
    };
    startCamera();
  }, []);

  const handleFaceLogin = async () => {
    if (!videoRef.current) return;

    const detections = await faceapi.detectSingleFace(videoRef.current).withFaceLandmarks().withFaceDescriptor();

    if (!detections) {
      toast.error("No face detected. Please try again.");
      return;
    }

    const currentDescriptor = detections.descriptor;
    console.log("✅ Current face descriptor:", currentDescriptor);

    // Fetch all stored face descriptors
    const faces = await databases.listDocuments("faceDB", "faces");

    let isMatched = false;
    let matchedFace = null;

    faces.documents.forEach((faceDoc) => {
      const storedDescriptor = new Float32Array(JSON.parse(faceDoc.descriptor));
      const distance = faceapi.euclideanDistance(currentDescriptor, storedDescriptor);
      console.log(`Distance to ${faceDoc.userId}:`, distance);

      if (distance < 0.6) { // 0.6 is a good threshold for face recognition
        isMatched = true;
        matchedFace = faceDoc;
      }
    });

    if (isMatched && matchedFace) {
      // Create session manually (simulate login)
      const userDoc = await account.get(matchedFace.userId);
      if (userDoc) {
        toast.success("Face recognized! Logging in...");
        router.push("/Dashboard");
      } else {
        toast.error("User not found!");
      }
    } else {
      toast.error("Face not recognized. Please try again.");
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Face Login</h2>
      <div className="flex justify-center">
        <video ref={videoRef} autoPlay muted width={300} height={300} className="rounded-md" />
      </div>
      <Button className="w-full mt-4" onClick={handleFaceLogin} disabled={!isReady}>
        Scan & Login
      </Button>
    </Card>
  );
}
