"use client";

import { useState } from "react";
import { upload } from "@imagekit/next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function VideoUploadPage() {
  const { data: session, status } = useSession();
  console.log("Session data in upload page:", session);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [userId, setUserId] = useState<string>(session?.user?.id || "");
  const [userName, setUserName] = useState<string>(
    session?.user?.username || ""
  );
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validateFile = (file: File) => {
    if (!file.type.startsWith("video/")) {
      setError("Please upload a valid video file");
      return false;
    }
    if (file.size >= 100 * 1024 * 1024) {
      setError("File must be less than 100MB");
      return false;
    }
    return true;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      const uploadResponse = await upload({
        file: file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        expire: auth.authenticationParameters.expire,
        token: auth.authenticationParameters.token,
        signature: auth.authenticationParameters.signature,
        onProgress: (event) => {
          if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100;
            setUploadProgress(Math.round(percent));
          }
        },
      });

      setVideoUrl(uploadResponse.url!);
      setThumbnailUrl(uploadResponse.thumbnailUrl || "");
      console.log("Upload successful ✅", uploadResponse);
    } catch (error) {
      console.error("Upload failed", error);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !videoUrl) {
      setError("Please fill all fields and upload a video.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          userName,
          title,
          description,
          videoUrl,
          thumbnailUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to upload video");
      }

      alert("Video uploaded successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
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
            disabled={loading || uploading}
          />

          <Textarea
            placeholder="Video description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading || uploading}
          />

          <div>
            <p className="text-sm font-medium mb-2">Video File</p>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              disabled={uploading || loading}
              className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-100 file:text-sm hover:file:bg-gray-200"
            />

            {uploading && (
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}

            {videoUrl && (
              <video
                src={videoUrl}
                controls
                className="mt-3 w-full rounded border"
              />
            )}
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading || uploading || !videoUrl}
            className="w-full"
          >
            {loading
              ? "Submitting..."
              : uploading
              ? "Please wait..."
              : "Submit Video"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
