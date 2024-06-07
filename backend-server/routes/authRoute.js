const express = require("express");
const router = express.Router();
const {
  blockUser,
  createUser,
  deleteAUser,
  // getAUser,
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
  createOrder,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMyOrders,
  // getMonthWiseOrderCount,
  getYearlyTotalOrders,
  getMonthWiseOrderData,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  emptyCart
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddleware");
const { checkout, paymentVerification } = require("../controllers/paymentCtrl");

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.get("/all-users", getAllUser);
router.get("/refresh", refreshToken);
router.get("/logout", logout);
router.delete("/:id", deleteAUser);
router.get("/get-my-orders", authMiddleware, getMyOrders);
// router.get("/monthwise-order-count", authMiddleware, isAdmin, getMonthWiseOrderCount);
router.get("/yealy-order-count", authMiddleware, isAdmin, getYearlyTotalOrders);
// router.get("/:id", authMiddleware, isAdmin, getAUser);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/payment-verification", authMiddleware, paymentVerification);
router.delete("/delete-product-cart/:cartItemId", authMiddleware, removeProductFromCart);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.put("/update-product-cart/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityFromCart);
router.post("/cart/create-order", authMiddleware, createOrder);
router.post("/cart", authMiddleware, userCart);
router.get("/wishlist", authMiddleware, getWishList);
router.get("/cart", authMiddleware, getUserCart);
router.put("/password", authMiddleware, updatePassword);
router.put("/update-user", authMiddleware, updateAUser);
router.put("/save-address", authMiddleware, saveAddress);
// router.get("/all-orders", authMiddleware, isAdmin, getAllOrders);
router.get("/orders", authMiddleware, isAdmin, getAllOrders);
router.get("/orders/:id", authMiddleware, isAdmin, getOrder);
router.get("/monthwise-order-data", authMiddleware, isAdmin, getMonthWiseOrderData);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.put(
  "/order/update-status/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);

module.exports = router;













// emptyCart,
// applyCoupon,
// getOrder,
// updateOrderStatus,
// getOrderByUserId,



// router.get("/get-order", authMiddleware, getOrder);
// router.post("/getorderbyuser/:id", authMiddleware, getOrderByUserId);
// router.delete("/empty-cart", authMiddleware, emptyCart);
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);