const express = require("express");
const {
  createBrand,
  deleteBrand,
  getABrand,
  getAllBrand,
  updateBrand,
} = require("../controllers/brandCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.get("/:id", getABrand);
router.get("/", getAllBrand);

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);

module.exports = router;
