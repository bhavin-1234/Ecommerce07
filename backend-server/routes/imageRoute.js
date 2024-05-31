const express = require("express");
const router = express.Router();
const { uploadPhoto } = require("../middlewares/uploadImages");
const {
    deleteImages,
    uploadImages,
} = require("../controllers/imageCtrl");
// const uploadPhoto = require("../middlewares/uploadImages");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddleware");



router.post(
    "/upload/blog-image",
    authMiddleware,
    isAdmin,
    uploadPhoto("blogs").array("images", 10),
    uploadImages
);

router.post(
    "/upload/product-image",
    authMiddleware,
    isAdmin,
    uploadPhoto("products").array("images", 10),
    uploadImages
);


router.delete("/delete/blogs/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
