import express from "express";
import {
  createEnquiry,
  deleteEnquiry,
  getAEnquiry,
  getAllEnquiry,
  updateEnquiry,
} from "../controllers/enqCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware.js";
const router = express.Router();

router.get("/:id", getAEnquiry);
router.get("/", getAllEnquiry);

router.post("/", createEnquiry);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);

export default router;
