const express = require("express");
const router = express.Router();
const {
  blockUser,
  createUser,
  deleteAUser,
  getAUser,
  getAllUser,
  loginUser,
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
  getOrderByUserId,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMyOrders
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddleware");
const { checkout, paymentVerification } = require("../controllers/paymentCtrl");

router.post("/register", createUser);
router.post("forgot-password-token", forgotPasswordToken);
router.put("reset-password/:token", resetPassword);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.get("/all-users", getAllUser);
router.get("/refresh", refreshToken);
router.get("/logout", logout);
router.delete("/:id", deleteAUser);
router.get("/get-my-orders", authMiddleware, getMyOrders);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/payment-verification", authMiddleware, paymentVerification);
// router.get("/get-order", authMiddleware, getOrder);
// router.post("/getorderbyuser/:id", authMiddleware, getOrderByUserId);
// router.get("/get-all-orders", authMiddleware, isAdmin, getAllOrders);
// router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/delete-product-cart/:cartItemId", authMiddleware, removeProductFromCart);
router.put("/update-product-cart/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityFromCart);
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);
router.post("/cart", authMiddleware, userCart);
router.get("/wishlist", authMiddleware, getWishList);
router.get("/cart", authMiddleware, getUserCart);
router.put("/password", authMiddleware, updatePassword);
router.put("/update-user", authMiddleware, updateAUser);
router.put("/save-address", authMiddleware, saveAddress);
// router.put(
//   "/order/update-order/:id",
//   authMiddleware,
//   isAdmin,
//   updateOrderStatus
// );
router.get("/:id", authMiddleware, isAdmin, getAUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
