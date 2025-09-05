"use client";

import { useEffect, useState } from "react";
import VideoCard from "../components/video-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import VideosNavbar from "../components/Navbar";
// import { Alert, AlertDescription, AlertTitle}

export default function VideosPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/video");
        if (!res.ok) throw new Error("Failed to load videos");
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading videos...</div>;

  if (error)
    return (
      <div className="p-4 max-w-xl mx-auto">
        <Alert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );

  return (
    <div>
      <VideosNavbar isLoggedIn={false} username="arslan" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
