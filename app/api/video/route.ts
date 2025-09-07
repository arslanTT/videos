import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { title } from "process";

export async function GET() {
  console.log("✅GET /api/video called");
  try {
    await connectToDB();
    console.log("✅GET /api/video called");
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
    console.log(videos);
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch videos: api/video file--> ", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized request!" },
        { status: 401 }
      );
    }

    const body: IVideo = await request.json();
    // console.log("✅", body.videoUrl);

    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.userName ||
      !body.userId
    ) {
      return NextResponse.json(
        { error: "please provide required details about video" },
        { status: 400 }
      );
    }
    await connectToDB();
    const videoData = {
      userId: body.userId,
      userName: body.userName,
      title: body.title,
      description: body.description,
      videoUrl: body.videoUrl,
      controls: body?.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality || 100,
      },
    };
    const newVideo = await Video.create(videoData);
    console.log("✅new video data", body);
    return NextResponse.json(newVideo);
  } catch (error) {
    console.error("Failed to fetch videos: api/video file--> ", error);
    return NextResponse.json(
      { error: "Failed to save video in DB " },
      { status: 500 }
    );
  }
}
