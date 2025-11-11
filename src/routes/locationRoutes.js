import express from "express";
import {
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController.js";

const router = express.Router();

router.post("/locations", createLocation);
router.get("/locations", getLocations);
router.put("/locations/:id", updateLocation);
router.delete("/locations/:id", deleteLocation);

export default router;
