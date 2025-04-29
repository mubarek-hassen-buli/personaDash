"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateSpotifyUrl, getSpotifyUrl } from "@/lib/spotifyService";

export function SpotifyWidget({ userId }: { userId: string }) {
  const [url, setUrl] = useState("");
  const [savedUrl, setSavedUrl] = useState("");

  useEffect(() => {
    const fetchUrl = async () => {
      const existingUrl = await getSpotifyUrl(userId);
      if (existingUrl) {
        setSavedUrl(existingUrl);
        setUrl(existingUrl);
      }
    };
    fetchUrl();
  }, [userId]);

  const handleSave = async () => {
    await updateSpotifyUrl(userId, url);
    setSavedUrl(url);
  };

  const getSpotifyEmbedSrc = (url: string) => {
    try {
      const match = url.match(/spotify\.com\/(track|playlist)\/([\w\d]+)/);
      if (!match) return null;
      const [, type, id] = match;
      return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`;
    } catch {
      return null;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>🎵 Spotify Player</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Paste Spotify URL (track or playlist)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={handleSave}>Save</Button>

        {savedUrl && getSpotifyEmbedSrc(savedUrl) && (
          <iframe
            src={getSpotifyEmbedSrc(savedUrl)!}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-md shadow"
          />
        )}
      </CardContent>
    </Card>
  );
}
