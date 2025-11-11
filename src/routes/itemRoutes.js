import express from "express";
import {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.post("/items", createItem);
router.get("/items", getItems);
router.put("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

export default router;
