"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface VideoCardProps {
  video: {
    _id: string;
    title: string;
    description?: string;
    videoUrl: string;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition">
      <CardHeader>
        <CardTitle className="truncate">{video.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <video
          src={video.videoUrl}
          className="w-full h-48 object-cover rounded-lg"
          muted
          playsInline
        />
        <Link href={`/videos/${video._id}`}>
          <Button className="mt-2 w-full">Play</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
