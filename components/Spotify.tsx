"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useUser } from "@/lib/useUser"; // custom hook to get current user
import { databases } from "@/lib/appwriteClient";
import { ID } from "appwrite";

const DB_ID = "6809ec950019f827d359";
const COLLECTION_ID = "68107b48002938a376de";

const SpotifyWidget = () => {
  const { user } = useUser();
  const [inputUrl, setInputUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [docId, setDocId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const loadSpotify = async () => {
      try {
        const res = await databases.listDocuments(DB_ID, COLLECTION_ID, [
          { key: "user_id", operator: "equal", value: user.$id },
        ]);

        if (res.documents.length > 0) {
          setInputUrl(res.documents[0].url);
          setEmbedUrl(getSpotifyEmbedUrl(res.documents[0].url));
          setDocId(res.documents[0].$id);
        }
      } catch (err) {
        console.error("Error loading Spotify URL", err);
      }
    };

    loadSpotify();
  }, [user]);

  const getSpotifyEmbedUrl = (url: string): string => {
    const match = url.match(/spotify\.com\/(track|playlist)\/([a-zA-Z0-9]+)/);
    if (!match) return "";
    const [, type, id] = match;
    return `https://open.spotify.com/embed/${type}/${id}`;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl || !user) return;
    try {
      if (docId) {
        await databases.updateDocument(DB_ID, COLLECTION_ID, docId, {
          url: inputUrl,
        });
      } else {
        const doc = await databases.createDocument(
          DB_ID,
          COLLECTION_ID,
          ID.unique(),
          {
            user_id: user.$id,
            url: inputUrl,
          }
        );
        setDocId(doc.$id);
      }
      setEmbedUrl(getSpotifyEmbedUrl(inputUrl));
    } catch (err) {
      console.error("Error saving Spotify URL", err);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto p-4 shadow-xl rounded-2xl">
      <CardHeader>
        <h2 className="text-xl font-bold">🎵 Your Spotify Player</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label htmlFor="spotifyUrl">
              Paste a Spotify track/playlist URL:
            </Label>
            <Input
              id="spotifyUrl"
              type="url"
              placeholder="https://open.spotify.com/track/..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Save & Embed
          </Button>
        </form>

        {embedUrl && (
          <div className="mt-6">
            <iframe
              className="rounded-xl w-full"
              src={embedUrl}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default SpotifyWidget;
