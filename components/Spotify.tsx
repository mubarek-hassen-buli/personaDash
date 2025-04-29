import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SpotifyWidget() {
  const [url, setUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    const storedUrl = localStorage.getItem("spotify-url");
    if (storedUrl) {
      const id = extractSpotifyId(storedUrl);
      if (id) setEmbedUrl(`https://open.spotify.com/embed/album/${id}`);
    }
  }, []);

  const extractSpotifyId = (url: string) => {
    const match = url.match(/spotify\.com\/(track|album|playlist)\/(\w+)/);
    return match ? match[2] : null;
  };

  const handleSubmit = () => {
    const id = extractSpotifyId(url);
    if (!id) return alert("Invalid Spotify URL");
    const newEmbedUrl = `https://open.spotify.com/embed/album/${id}`;
    setEmbedUrl(newEmbedUrl);
    localStorage.setItem("spotify-url", url);
  };

  return (
    <Card className="w-full max-w-xl mx-auto p-4 rounded-2xl shadow-xl">
      <CardHeader className="mb-2">
        <h2 className="text-xl font-semibold">🎵 Spotify Widget</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="spotifyUrl">Paste Spotify Link</Label>
          <Input
            id="spotifyUrl"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://open.spotify.com/album/xyz"
          />
          <Button onClick={handleSubmit} className="mt-2 w-full">
            Embed
          </Button>
        </div>

        {embedUrl && (
          <iframe
            src={embedUrl}
            width="100%"
            height="152"
            allow="encrypted-media"
            className="rounded-lg border"
          ></iframe>
        )}
      </CardContent>
    </Card>
  );
}
