import express from "express";
import {
  createColor,
  deleteColor,
  getAColor,
  getAllColor,
  updateColor,
} from "../controllers/colorCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware.js";
const router = express.Router();

router.get("/:id", getAColor);
router.get("/", getAllColor);

router.post("/", authMiddleware, isAdmin, createColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);

export default router;
