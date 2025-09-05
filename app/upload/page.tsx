"use client";

import { useState } from "react";
import FileUpload from "../components/fileUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(""); // <-- auto from upload
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title || !description || !videoUrl) {
      alert("Please fill all fields and upload a video.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          thumbnailUrl, // <-- send along
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to upload video");
      }

      alert("Video uploaded successfully!");
      router.push("/"); // redirect after upload
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Upload Video</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Video description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div>
            <p className="text-sm font-medium mb-1">Video</p>
            <FileUpload
              fileType="video"
              onSuccess={(res) => {
                setVideoUrl(res.url);
                setThumbnailUrl(res.thumbnailUrl); // <-- grab thumbnail from same upload
              }}
            />
            {videoUrl && (
              <video
                src={videoUrl}
                controls
                className="mt-2 w-full rounded border"
              />
            )}
          </div>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Uploading..." : "Submit"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
