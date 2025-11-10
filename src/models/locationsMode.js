import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

export default mongoose.model("locations", locationSchema);
