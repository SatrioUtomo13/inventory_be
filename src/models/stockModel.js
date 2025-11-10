import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    item_id: { type: mongoose.Schema.Types.ObjectId, ref: "items" },
    change: { type: Number, required: true },
    reason: { type: String, required: false },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

export default mongoose.model("stocks", stockSchema);
