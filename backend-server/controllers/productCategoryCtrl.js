const Category = require("../models/productCategoryModel");
const { validateMongoDBID } = require("../utils/validateMongoDBID");

const createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);

    } catch (error) {
        console.error("Error while creating a Category: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    try {
        validateMongoDBID(id);
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedCategory);

    } catch (error) {
        console.error("Error while updaing a Category: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        validateMongoDBID(id);
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.json(deletedCategory);

    } catch (error) {
        console.error("Error while deleting a Category: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getACategory = async (req, res) => {
    const { id } = req.params;
    try {
        validateMongoDBID(id);
        const fetchCategory = await Category.findById(id);
        res.json(fetchCategory);

    } catch (error) {
        console.error("Error while fetching single Category: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllCategory = async (req, res) => {
    try {
        const fetchAllCategory = await Category.find({});
        res.json(fetchAllCategory);

    } catch (error) {
        console.error("Error while fetching all Category: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { createCategory, updateCategory, deleteCategory, getACategory, getAllCategory };