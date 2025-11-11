import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import itemRoutes from "./src/routes/itemRoutes.js";
import itemCategoryRoutes from "./src/routes/itemCategoryRoutes.js";
import stockRoutes from "./src/routes/stockRoutes.js";
import locationRoutes from "./src/routes/locationRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", itemRoutes);
app.use("/api", itemCategoryRoutes);
app.use("/api", stockRoutes);
app.use("/api", locationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
