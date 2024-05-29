const Enquiry = require("../models/enqModel");
const { validateMongoDBID } = require("../utils/validatemongoDBID");

const createEnquiry = async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json(newEnquiry);
  } catch (error) {
    console.error("Error while creating a Enquiry: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateEnquiry = async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBID(id);
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedEnquiry);
  } catch (error) {
    console.error("Error while updaing a Enquiry: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteEnquiry = async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBID(id);
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    res.json(deletedEnquiry);
  } catch (error) {
    console.error("Error while deleting a Enquiry: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAEnquiry = async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBID(id);
    const fetchEnquiry = await Enquiry.findById(id);
    res.json(fetchEnquiry);
  } catch (error) {
    console.error("Error while fetching single Enquiry: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllEnquiry = async (req, res) => {
  try {
    const fetchAllEnquiry = await Enquiry.find({});
    res.json(fetchAllEnquiry);
  } catch (error) {
    console.error("Error while fetching all Enquiry: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getAEnquiry,
  getAllEnquiry,
};
