import express from "express";
import { createBrand, deleteBrand, getABrand, getAllBrand, updateBrand } from "../controllers/brandCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);
router.get("/:id", getABrand);
router.get("/", getAllBrand);

export default router;