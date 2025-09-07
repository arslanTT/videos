"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { User2, Play } from "lucide-react";
import { useState, useRef } from "react";

interface VideoCardProps {
  video: {
    _id: string;
    userName: string;
    userId: string;
    title: string;
    description?: string;
    videoUrl: string;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignore play errors
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Card
      className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border-0 hover:scale-[1.02]"
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        {/* Video Thumbnail/Preview */}
        <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
          <video
            ref={videoRef}
            src={video.videoUrl}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            muted
            playsInline
            preload="metadata"
            onError={() => setThumbnailError(true)}
          />

          {/* Play overlay */}
          <div
            className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-white">
              <Play
                className="h-6 w-6 text-gray-800 ml-1"
                fill="currentColor"
              />
            </div>
          </div>

          {/* Gradient overlay for better text readability */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <CardContent className="p-4">
          {/* Title */}
          <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {video.title}
          </h3>

          {/* Creator info */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold">
                {video.userName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {video.userName}
              </p>
            </div>
          </div>

          {/* Watch button */}
          <Link href={`/videos/${video._id}`} className="block">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
              <Play className="h-4 w-4 mr-2" fill="currentColor" />
              Watch Video
            </Button>
          </Link>
        </CardContent>
      </div>
    </Card>
  );
}
