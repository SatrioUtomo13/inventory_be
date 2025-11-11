import Location from "../models/locationsModel.js";
import mongoose from "mongoose";

export const createLocation = async (req, res) => {
  try {
    const { name, description } = req.body;

    // check name duplication
    const existingLocation = await Location.findOne({ name });
    if (existingLocation)
      return res.status(400).json({ message: "Location name already exists" });

    const location = await Location.create({ name, description });
    res
      .status(201)
      .json({ message: "Location created successfully", location });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create location", error: error.message });
  }
};

export const getLocations = async (req, res) => {
  try {
    const { id } = req.query;

    let locations;

    if (id && id !== "0") {
      // find by id

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      locations = await Location.findById(id);
    } else {
      // find all
      locations = await Location.find();
    }

    if (id && !locations)
      return res.status(404).json({ message: "Location not found" });

    res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get locations", error: error.message });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID is invalid" });
    }

    const location = await Location.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(description && { description }),
      },
      { new: true }
    );

    if (!location)
      return res.status(404).json({ message: "Location not found" });

    res
      .status(200)
      .json({ message: "Location updated successfully", location });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update location", error: error.message });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "ID is invalid" });

    const location = await Location.findByIdAndDelete(id);
    if (!location)
      return res.status(404).json({ message: "Location not found" });

    res
      .status(200)
      .json({ message: "Location deleted successfully", location });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete location", error: error.message });
  }
};
