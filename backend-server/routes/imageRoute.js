const express = require("express");
const router = express.Router();
const {
    deleteImages,
    uploadImages,
} = require("../controllers/imageCtrl");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddleware");

router.post(
    "/upload",
    authMiddleware,
    isAdmin,
    uploadPhoto("products").array("images", 10),
    productImgResize,
    uploadImages
);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
