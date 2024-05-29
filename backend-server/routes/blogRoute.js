const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddleware");
const {
  createBlog,
  getAllBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  // uploadImages,
} = require("../controllers/blogCtrl");
// const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImages");
// const { deleteImages } = require("../controllers/productCtrl");
const router = express.Router();

router.get("/", getAllBlog);
router.get("/:id", getBlog);
// router.post(
//   "/upload/:id",
//   authMiddleware,
//   isAdmin,
//   uploadPhoto("blogs").array("images", 2),
//   blogImgResize,
//   uploadImages
// );
router.put("/like", authMiddleware, likeBlog);
router.put("/dislike", authMiddleware, disLikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.post("/", authMiddleware, isAdmin, createBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);
// router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
