import ItemCategory from "../models/itemCategoryModel.js";
import mongoose from "mongoose";

export const createItemCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // check name duplication
    const existingCategory = await ItemCategory.findOne({ name });
    if (existingCategory)
      return res.status(400).json({ message: "Category name already exists" });

    const category = await ItemCategory.create({ name, description });
    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create category", error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const { id } = req.query;

    let categories;

    if (id && id !== "0") {
      // find by id

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      categories = await ItemCategory.findById(id);
    } else {
      // find all
      categories = await ItemCategory.find();
    }

    if (!categories)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get categories", error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!id) return res.status(400).json({ message: "ID is invalid" });

    const category = await ItemCategory.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(description && { description }),
      },
      { new: true }
    );

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update category", error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "ID is invalid" });

    const category = await ItemCategory.findByIdAndDelete(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res
      .status(200)
      .json({ message: "Category deleted successfully", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete category", error: error.message });
  }
};
