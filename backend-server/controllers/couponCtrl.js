const Coupon = require("../models/couponModel");
const { validateMongoDBID } = require("../utils/validateMongoDBID");


const createCoupon = async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (error) {
        console.error("Error while creating the Coupon: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllCoupon = async (req, res) => {
    try {
        const allCoupon = await Coupon.find({});
        res.json(allCoupon);
    } catch (error) {
        console.error("Error while fetching all the Coupon: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getACoupon = async (req, res) => {
    const { id } = req.params;
    try {
        validateMongoDBID(id);
        const singleCoupon = await Coupon.findById(id);
        res.json(singleCoupon);
    } catch (error) {
        console.error("Error while fetching the Coupon: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateCoupon = async (req, res) => {
    const { id } = req.params;
    try {
        validateMongoDBID(id);
        const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedCoupon);
    } catch (error) {
        console.error("Error while updating the Coupon: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteCoupon = async (req, res) => {
    const { id } = req.params;
    try {
        validateMongoDBID(id);
        const deletedCoupon = await Coupon.findByIdAndDelete(id);
        res.json(deletedCoupon);
    } catch (error) {
        console.error("Error while deleting the Coupon: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createCoupon, getAllCoupon, updateCoupon, deleteCoupon, getACoupon };
