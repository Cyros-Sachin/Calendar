import mongoose from "mongoose";

const goalSchema = mongoose.Schema({
  name: String,
  color: String,
});

export default mongoose.model("Goal", goalSchema);
