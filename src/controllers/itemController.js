import Item from "../models/itemsModel.js";

export const createItem = async (req, res) => {
  try {
    const { name, code, amount, picture_url, category_id, location_id } =
      req.body;

    // check code duplication
    const existingItem = await Item.findOne({ code });
    if (existingItem)
      return res.status(400).json({ message: "Item code already exists" });

    const item = await Item.create({
      name,
      code,
      amount,
      picture_url,
      category_id,
      location_id,
    });

    res.status(201).json({
      message: "Item created successfully",
      item,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create item", error: error.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const { id } = req.query;

    let items;

    if (id && id !== "0") {
      // find by id
      items = await Item.findById(id)
        .populate("category_id")
        .populate("location_id");
    } else {
      // find all
      items = await Item.find().populate("category_id").populate("location_id");
    }

    if (id && !items)
      return res.status(404).json({ message: "Item not found" });

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get items", error: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, amount, picture_url, category_id, location_id } =
      req.body;

    if (!id) return res.status(400).json({ message: "ID is invalid" });

    const item = await Item.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(code && { code }),
        ...(amount !== undefined && { amount }),
        ...(picture_url && { picture_url }),
        ...(category_id && { category_id }),
        ...(location_id && { location_id }),
      },
      { new: true }
    )
      .populate("category_id")
      .populate("location_id");

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update item", error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "ID is invalid" });

    const item = await Item.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item deleted successfully", item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete item", error: error.message });
  }
};
