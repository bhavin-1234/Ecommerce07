const express = require("express");
const {
  createEnquiry,
  deleteEnquiry,
  getAEnquiry,
  getAllEnquiry,
  updateEnquiry,
} = require("../controllers/enqCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.get("/:id", getAEnquiry);
router.get("/", getAllEnquiry);

router.post("/", createEnquiry);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);

module.exports = router;
