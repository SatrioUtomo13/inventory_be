import Stock from "../models/stockModel.js";

export const createStock = async (req, res) => {
  try {
    const { change, reason, item_id, user_id } = req.body;

    const stock = await Stock.create({ change, reason, item_id, user_id });
    res.status(201).json({ message: "Stock created successfully", stock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getStocks = async (req, res) => {
  try {
    const { id } = req.query;

    let stocks;

    if (id && id !== "0") {
      // find by id
      stocks = await Stock.findById(id);
    } else {
      // find all
      stocks = await Stock.find();
    }

    if (id && !stocks)
      return res.status(404).json({ message: "Stock not found" });

    res.status(200).json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { change, reason, item_id, user_id } = req.body;

    if (!id) return res.status(400).json({ message: "ID is invalid" });

    const stock = await Stock.findByIdAndUpdate(
      id,
      {
        ...(change && { change }),
        ...(reason && { reason }),
        ...(item_id && { item_id }),
        ...(user_id && { user_id }),
      },
      { new: true }
    );

    if (!stock) return res.status(404).json({ message: "Stock not found" });

    res.status(200).json({ message: "Stock updated successfully", stock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "ID is invalid" });

    const stock = await Stock.findByIdAndDelete(id);
    if (!stock) return res.status(404).json({ message: "Stock not found" });

    res.status(200).json({ message: "Stock deleted successfully", stock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
