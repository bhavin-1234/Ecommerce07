import express from "express";
const router = express.Router();
import {
  addToWishlist,
  createProduct,
  deleteAProduct,
  deleteImages,
  getAProduct,
  getAllProducts,
  rating,
  updateAProduct,
  uploadImages,
} from "../controllers/productCtrl.js";
import { uploadPhoto, productImgResize } from "../middlewares/uploadImages.js";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware.js";

router.get("/", getAllProducts);
router.get("/:id", getAProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.post(
  "/upload",
  authMiddleware,
  isAdmin,
  uploadPhoto("products").array("images", 10),
  productImgResize,
  uploadImages
);
router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/:id", authMiddleware, isAdmin, updateAProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteAProduct);
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

export default router;
