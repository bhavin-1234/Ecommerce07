const Color = require("../models/colorModel");
const { validateMongoDBID } = require("../utils/validatemongoDBID");

const createColor = async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (error) {
    console.error("Error while creating a Color: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateColor = async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBID(id);
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedColor);
  } catch (error) {
    console.error("Error while updaing a Color: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteColor = async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBID(id);
    const deletedColor = await Color.findByIdAndDelete(id);
    res.json(deletedColor);
  } catch (error) {
    console.error("Error while deleting a Color: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAColor = async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBID(id);
    const fetchColor = await Color.findById(id);
    res.json(fetchColor);
  } catch (error) {
    console.error("Error while fetching single Color: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllColor = async (req, res) => {
  try {
    const fetchAllColor = await Color.find({});
    res.json(fetchAllColor);
  } catch (error) {
    console.error("Error while fetching all Color: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createColor, updateColor, deleteColor, getAColor, getAllColor };
