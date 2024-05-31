const express = require("express");
const { createCoupon, getAllCoupon, updateCoupon, deleteCoupon, getACoupon } = require("../controllers/couponCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupon);
router.get("/:id", authMiddleware, isAdmin, getACoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);

module.exports = router;
