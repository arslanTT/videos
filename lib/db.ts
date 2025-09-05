import mongoose from "mongoose";
import { Connection } from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define mongodb uri in .env variables.");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDB(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    // mongoose.connect(MONGODB_URI, opts).then(() => mongoose.connection)
    if (!cached.promise) {
      const opts = { bufferCommands: true, maxPoolSize: 10 };
      cached.promise = mongoose
        .connect(MONGODB_URI, opts)
        .then((m) => m.connection);
    }
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}
