import express from "express";
const router = express.Router();
import { blockUser, createUser, deleteAUser, getAUser, getAllUser, loginUserCtrl, logout, refreshToken, unblockUser, updateAUser, updatePassword } from "../controllers/userCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware.js";


router.post("/register", createUser);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.get("/all-users", getAllUser);
router.delete("/:id", deleteAUser);
router.get("/refresh", refreshToken);
router.get("/logout", logout);
router.put("/edit-user", authMiddleware, updateAUser);
router.get("/:id", authMiddleware, isAdmin, getAUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

export default router;