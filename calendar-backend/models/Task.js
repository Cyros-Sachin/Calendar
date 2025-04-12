import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: "Goal" },
  name: String,
});

export default mongoose.model("Task", taskSchema);
