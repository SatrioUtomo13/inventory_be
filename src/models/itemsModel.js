import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    amount: { type: Number, required: true, min: 0 },
    picture_url: { type: String, required: false },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "itemCategories",
      required: true,
    },
    location_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "locations",
      required: true,
    },
  },
  { timestamps: true }
);

itemSchema.pre("save", async function (next) {
  if (!this.code) {
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

    this.code = `ITEM-${random}`;
  }
  next();
});

export default mongoose.model("items", itemSchema);
