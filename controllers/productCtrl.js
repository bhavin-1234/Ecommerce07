import Product from "../models/ProductModel.js";
import slugify from "slugify";

const createProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    console.error("Error while creating a product: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateAProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error while updating a product: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteAProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json(deletedProduct);
  } catch (error) {
    console.error("Error while Deleting a product: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    console.error("Error while fetching a single product: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    // filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields", "skip"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));

    // sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //  pagination

    if (req.query.page || req.query.limit) {
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      const totalProducts = await Product.countDocuments();

      if (skip >= totalProducts) {
        res.json({ message: "This page doesn't exists!!" });
      } else {
        query = query.skip(skip).limit(limit);
      }
    }

    const product = await query;
    res.json(product);
  } catch (error) {
    console.error("Error while fetching all product: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createProduct,
  getAProduct,
  getAllProducts,
  updateAProduct,
  deleteAProduct,
};
