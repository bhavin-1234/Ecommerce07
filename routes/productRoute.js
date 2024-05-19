import express from "express";
const router = express.Router();
import {
  addToWishlist,
  createProduct,
  deleteAProduct,
  getAProduct,
  getAllProducts,
  rating,
  updateAProduct,
} from "../controllers/productCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware.js";

router.get("/", getAllProducts);
router.get("/:id", getAProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/:id", authMiddleware, isAdmin, updateAProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteAProduct);

export default router;
