import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";

import eventRoutes from "./routes/eventRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/tasks", taskRoutes);

// MongoDB connection — connect only once
let isConnected = false;
const connectDB = async () => {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected");
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Export as serverless function
export const handler = serverless(app);
