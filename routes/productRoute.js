import express from "express";
const router = express.Router();
import {
  createProduct,
  deleteAProduct,
  getAProduct,
  getAllProducts,
  updateAProduct,
} from "../controllers/productCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware.js";

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getAProduct);
router.put("/:id", authMiddleware, isAdmin, updateAProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteAProduct);

export default router;
