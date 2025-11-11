import express from "express";
import {
  createItemCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/itemCategoryController.js";

const router = express.Router();

router.post("/item-categories", createItemCategory);
router.get("/item-categories", getCategories);
router.put("/item-categories/:id", updateCategory);
router.delete("/item-categories/:id", deleteCategory);

export default router;
