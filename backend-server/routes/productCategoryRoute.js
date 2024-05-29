const express = require("express");
const { createCategory, deleteCategory, getACategory, getAllCategory, updateCategory } = require("../controllers/productCategoryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.get("/:id", getACategory);
router.get("/", getAllCategory);
router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = router;