import express from "express";
import {
  createStock,
  getStocks,
  updateStock,
  deleteStock,
} from "../controllers/stockController.js";

const router = express.Router();

router.post("/stocks", createStock);
router.get("/stocks", getStocks);
router.put("/stocks/:id", updateStock);
router.delete("/stocks/:id", deleteStock);

export default router;
