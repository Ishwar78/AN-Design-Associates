import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleContact } from "./routes/contact";
import path from "path";
import expressStatic from "express";
import { adminRouter } from "./routes/admin";
import { connectDB } from "./db"; // 🔥 Add this line

export function createServer() {
  const app = express();

  // 🧠 Connect to MongoDB
  connectDB(); // 🔥 Add this line

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static uploads
  app.use("/uploads", expressStatic.static(path.resolve("uploads")));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/contact", handleContact);

  // Admin/data routes
  app.use("/api", adminRouter);

  return app;
}
