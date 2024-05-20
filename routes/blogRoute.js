import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware.js";
import {
  createBlog,
  getAllBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  uploadImages,
} from "../controllers/blogCtrl.js";
import { blogImgResize, uploadPhoto } from "../middlewares/uploadImages.js";
const router = express.Router();

router.get("/", getAllBlog);
router.get("/:id", getBlog);
router.post(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto("blogs").array("images", 2),
  blogImgResize,
  uploadImages
);
router.put("/like", authMiddleware, likeBlog);
router.put("/dislike", authMiddleware, disLikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.post("/", authMiddleware, isAdmin, createBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

export default router;
