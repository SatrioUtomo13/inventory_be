import mongoose from "mongoose";

const itemCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
});

export default mongoose.model("itemCategories", itemCategorySchema);
