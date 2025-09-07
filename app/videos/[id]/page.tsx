"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import VideoPlayer from "@/app/components/video-player";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PlayVideoPage() {
  const params = useParams();
  const id = params?.id as string;
  console.log("Video ID from params:", id);
  // console.log(id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [video, setVideo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchVideo = async () => {
      try {
        const res = await fetch(`/api/video/${id}`);
        if (!res.ok) throw new Error("Video not found");
        const data = await res.json();
        console.log("Fetched video data:", data);
        setVideo(data);
        // console.log(video);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);
  console.log("❤️ videos data", video);

  if (loading) return <div className="p-4 text-center">Loading video...</div>;

  if (error)
    return (
      <div className="p-4 max-w-xl mx-auto">
        <Alert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );

  if (!video) return null;

  return <VideoPlayer video={video} />;
}
