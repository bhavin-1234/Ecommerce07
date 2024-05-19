import slugify from "slugify";
import User from "../models/UserModel.js";
import Product from "../models/productModel.js";

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

const addToWishlist = async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyAdded = user.wishlist.find((id) => id.toString() === productId);
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(_id, {
        $pull: { wishlist: productId }
      }, { new: true });
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(_id, {
        $push: { wishlist: productId }
      }, { new: true });
      res.json(user);
    }
  } catch (error) {
    console.error("Error while wishlist the product: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const rating = async (req, res) => {
  const { _id } = req.user;
  const { star, productId, comment } = req.body;
  try {
    const product = await Product.findById(productId);
    console.log("product:", product);
    const alreadyRated = product.ratings.find(userId => userId.postedBy.toString() === _id.toString());
    console.log(alreadyRated);
    if (alreadyRated) {
      await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment }
        },
        { new: true }
      );
    } else {
      await Product.findByIdAndUpdate(productId, {
        $push: {
          ratings: {
            star: star,
            comment: comment,
            postedBy: _id
          }
        }
      }, { new: true });
    }

    const Ratedproduct = await Product.findById(productId);
    const totalRatingGivers = Ratedproduct.ratings.length;
    const ratingSum = Ratedproduct.ratings.map((item) => item.star).reduce((accum, current) => accum + current, 0);

    let actualRating = 0;
    if (totalRatingGivers !== 0) {
      actualRating = Math.round(ratingSum / totalRatingGivers);
    }
    const stringRating = actualRating.toString();
    const finalProduct = await Product.findByIdAndUpdate(productId, {
      totalRating: stringRating
    }, { new: true });
    res.json(finalProduct);

  } catch (error) {
    console.error("Error while rate the product: ", error);
    res.status(500).json({ message: "Internal server error" });
  }

}

export {
  createProduct,
  getAProduct,
  getAllProducts,
  updateAProduct,
  deleteAProduct,
  addToWishlist,
  rating
};
