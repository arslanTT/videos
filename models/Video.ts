import mongoose from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
};

export interface IVideo {
  _id: mongoose.Types.ObjectId;
  userId: string;
  userName: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    width: number;
    height: number;
    quality?: number;
  };
}

const videoSchema = new mongoose.Schema<IVideo>({
  title: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  description: { type: String, required: true },
  controls: { type: Boolean, default: true },
  videoUrl: { type: String, required: true },
  transformation: {
    height: { type: Number, default: VIDEO_DIMENSIONS.height },
    width: { type: Number, default: VIDEO_DIMENSIONS.width },
    quality: { type: Number, min: 3, max: 100 },
  },
});

const Video =
  mongoose.models?.Video || mongoose.model<IVideo>("Video", videoSchema);

export default Video;
