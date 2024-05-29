import express from "express";
import { createCategory, deleteCategory, getACategory, getAllCategory, updateCategory } from "../controllers/blogCategoryCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware.js";
const router = express.Router();

router.get("/:id", getACategory);
router.get("/", getAllCategory);
router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

export default router;