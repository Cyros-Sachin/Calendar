import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

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

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log("Server running on port ${ PORT }"));
  })
  .catch((error) => console.log(error)); 