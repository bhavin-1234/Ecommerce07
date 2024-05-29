const express = require("express");
const {
  createColor,
  deleteColor,
  getAColor,
  getAllColor,
  updateColor,
} = require("../controllers/colorCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.get("/:id", getAColor);
router.get("/", getAllColor);

router.post("/", authMiddleware, isAdmin, createColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);

module.exports = router;
