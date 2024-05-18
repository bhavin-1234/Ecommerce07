import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware.js";
import {
  createBlog,
  getAllBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
} from "../controllers/blogCtrl.js";
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);
router.put("/likes", authMiddleware, isAdmin, likeBlog);

export default router;
