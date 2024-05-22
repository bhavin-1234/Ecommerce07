import express from "express";
import { createCoupon, getAllCoupon, updateCoupon, deleteCoupon } from "../controllers/couponCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);

export default router;
