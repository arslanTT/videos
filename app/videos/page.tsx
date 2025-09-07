"use client";

import { useEffect, useState } from "react";
import VideoCard from "../components/video-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import VideosNavbar from "../components/Navbar";
import { Loader2, Video, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function VideosPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [videos, setVideos] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/video");
        if (!res.ok) throw new Error("Failed to load videos");
        const data = await res.json();
        setVideos(data);
        setFilteredVideos(data);
        console.log("Fetched videos:", data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    const filtered = videos.filter(
      (video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (video.description &&
          video.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredVideos(filtered);
  }, [searchQuery, videos]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <VideosNavbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Loading videos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <VideosNavbar />
        <div className="flex items-center justify-center h-[60vh] p-4">
          <Alert className="max-w-md">
            <Video className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <VideosNavbar />

      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Video Gallery
            </h1>
            <p className="text-gray-600 text-lg">
              Discover amazing videos from our community
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-2 focus:border-blue-500 rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="container mx-auto px-4 py-8">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-16">
            <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-gray-700">
              {searchQuery ? "No videos found" : "No videos yet"}
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No videos match "${searchQuery}". Try a different search.`
                : "Upload the first video to get started!"}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {searchQuery
                  ? `Found ${filteredVideos.length} video${
                      filteredVideos.length === 1 ? "" : "s"
                    } for "${searchQuery}"`
                  : `${filteredVideos.length} video${
                      filteredVideos.length === 1 ? "" : "s"
                    } available`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
