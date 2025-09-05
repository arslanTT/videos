import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Video from "@/models/Video";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const video = await Video.findById(params.id);
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }
    return NextResponse.json(video);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
