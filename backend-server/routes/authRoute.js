import express from "express";
const router = express.Router();
import {
  blockUser,
  createUser,
  deleteAUser,
  getAUser,
  getAllUser,
  loginUserCtrl,
  logout,
  refreshToken,
  unblockUser,
  updateAUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/userCtrl.js";
import { authMiddleware, isAdmin } from "../middlewares/authmiddleware.js";

router.post("/register", createUser);
router.post("forgot-password-token", forgotPasswordToken);
router.put("reset-password/:token", resetPassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.get("/all-users", getAllUser);
router.get("/get-order", authMiddleware, getOrder);
router.get("/get-all-orders", authMiddleware, isAdmin, getAllOrders);
router.get("/refresh", refreshToken);
router.get("/logout", logout);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.delete("/:id", deleteAUser);
router.post("/cart", authMiddleware, userCart);
router.get("/wishlist", authMiddleware, getWishList);
router.get("/cart", authMiddleware, getUserCart);
router.put("/password", authMiddleware, updatePassword);
router.put("/edit-user", authMiddleware, updateAUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);
router.get("/:id", authMiddleware, isAdmin, getAUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

export default router;
