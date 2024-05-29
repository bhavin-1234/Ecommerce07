import express from "express";
const router = express.Router();
import {
    deleteImages,
    uploadImages,
} from "../controllers/imageCtrl.js";
import { uploadPhoto, productImgResize } from "../middlewares/uploadImages.js";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware.js";

router.post(
    "/upload",
    authMiddleware,
    isAdmin,
    uploadPhoto("products").array("images", 10),
    productImgResize,
    uploadImages
);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteImages);

export default router;
