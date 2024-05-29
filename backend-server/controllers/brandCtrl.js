const Brand = require("../models/brandModel.js");
const { validateMongoDBID } = require("../utils/validatemongoDBID");

const createBrand = async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);

    } catch (error) {
        console.error("Error while creating a Brand: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateBrand = async (req, res) => {
    const { id } = req.params;
    try {
        validateMongoDBID(id);
        const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedBrand);

    } catch (error) {
        console.error("Error while updaing a Brand: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteBrand = async (req, res) => {
    const { id } = req.params;
    try {
        validateMongoDBID(id);
        const deletedBrand = await Brand.findByIdAndDelete(id);
        res.json(deletedBrand);

    } catch (error) {
        console.error("Error while deleting a Brand: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getABrand = async (req, res) => {
    const { id } = req.params;
    try {
        validateMongoDBID(id);
        const fetchBrand = await Brand.findById(id);
        res.json(fetchBrand);

    } catch (error) {
        console.error("Error while fetching single Brand: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllBrand = async (req, res) => {
    try {
        const fetchAllBrand = await Brand.find({});
        res.json(fetchAllBrand);

    } catch (error) {
        console.error("Error while fetching all Brand: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { createBrand, updateBrand, deleteBrand, getABrand, getAllBrand };