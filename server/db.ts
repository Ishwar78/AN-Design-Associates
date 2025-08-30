import mongoose from "mongoose";

let isConnected = false;
let lastFailAt = 0;

export async function connectDB(
  uri = process.env.MONGO_URI || "",
): Promise<boolean> {
  if (isConnected) return true;
  if (!uri) {
    console.error("MONGO_URI not set");
    return false;
  }
  const now = Date.now();
  if (now - lastFailAt < 10_000) return false;
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      retryWrites: true,
    } as any);
    isConnected = true;
    mongoose.connection.on("error", (e) => {
      console.error("Mongo error", e);
    });
    mongoose.connection.on("disconnected", () => {
      isConnected = false;
      lastFailAt = Date.now();
    });
    mongoose.connection.on("connected", () => {
      isConnected = true;
    });
    return true;
  } catch (err) {
    lastFailAt = now;
    console.error("Mongo connect failed:", (err as Error).message);
    return false;
  }
}
