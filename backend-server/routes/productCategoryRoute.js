import express from "express";
import { createCategory, deleteCategory, getACategory, getAllCategory, updateCategory } from "../controllers/productCategoryCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", getACategory);
router.get("/", getAllCategory);

export default router;