const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  createProduct,
  deleteAProduct,
  getAProduct,
  getAllProducts,
  rating,
  updateAProduct,
} = require("../controllers/productCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddleware");

router.get("/", getAllProducts);
router.get("/:id", getAProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/:id", authMiddleware, isAdmin, updateAProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteAProduct);

module.exports = router;
