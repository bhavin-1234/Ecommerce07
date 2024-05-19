import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware.js";
import {
  createBlog,
  getAllBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog
} from "../controllers/blogCtrl.js";
const router = express.Router();

router.get("/", getAllBlog);
router.get("/:id", getBlog);
router.put("/like", authMiddleware, likeBlog);
router.put("/dislike", authMiddleware, disLikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.post("/", authMiddleware, isAdmin, createBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

export default router;
