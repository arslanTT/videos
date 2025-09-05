"use client";

import { Video } from "@imagekit/next"; // ✅ use the official ImageKit component
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface VideoPlayerProps {
  video: {
    title: string;
    description?: string;
    videoUrl: string; // should be the path on ImageKit, e.g. "/uploads/video.mp4"
  };
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const router = useRouter();

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-3xl rounded-2xl shadow-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{video.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="rounded-xl overflow-hidden border">
            <Video
              // This must be your ImageKit base URL (not the full file URL)
              urlEndpoint={video.videoUrl}
              // This is the actual file path stored in DB
              src={video.videoUrl}
              controls
              // className="w-full h-auto"
              style={{
                // aspectRatio: "9 / 16", // optional for reels-like
                objectFit: "cover",
              }}
            />
          </div>

          {video.description && (
            <p className="text-muted-foreground text-sm">{video.description}</p>
          )}

          <Button onClick={() => router.push("/videos")} className="w-fit">
            Back to Videos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
