import mongoose from "mongoose";

const aiLogsSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    query: { type: String, required: true },
    response: { type: String, required: true },
    report_generated: { type: Boolean, default: false },
    automation_triggered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("aiLogs", aiLogsSchema);
