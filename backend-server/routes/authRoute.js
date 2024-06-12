const express = require("express");
const router = express.Router();
// const {
//   blockUser,
//   createUser,
//   // deleteAUser,
//   // getAUser,
//   getAllUser,
//   loginUser,
//   logout,
//   refreshToken,
//   unblockUser,
//   updateAUser,
//   updatePassword,
//   forgotPasswordToken,
//   resetPassword,
//   loginAdmin,
//   getWishList,
//   saveAddress,
//   userCart,
//   getUserCart,
//   createOrder,
//   removeProductFromCart,
//   updateProductQuantityFromCart,
//   getMyOrders,
//   // getMonthWiseOrderCount,
//   getYearlyTotalOrders,
//   getMonthWiseOrderData,
//   getAllOrders,
//   getOrder,
//   updateOrderStatus,
//   emptyCart
// } = require("../controllers/userCtrl");
const authRoutes = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddleware");
// const { checkout, paymentVerification } = require("../controllers/paymentCtrl");

router.post("/register", authRoutes.createUser);
router.post("/forgot-password-token", authRoutes.forgotPasswordToken);
router.put("/reset-password/:token", authRoutes.resetPassword);
router.post("/login", authRoutes.loginUser);
router.post("/admin-login", authRoutes.loginAdmin);
router.get("/all-users", authRoutes.getAllUser);
router.get("/refresh", authRoutes.refreshToken);
router.get("/logout", authRoutes.logout);
// router.delete("/:id", authRoutes.deleteAUser);
router.get("/get-my-orders", authMiddleware, authRoutes.getMyOrders);
// router.get("/monthwise-order-count", authMiddleware, isAdmin, authRoutes.getMonthWiseOrderCount);
router.get("/yealy-order-count", authMiddleware, isAdmin, authRoutes.getYearlyTotalOrders);
// router.get("/:id", authMiddleware, isAdmin, authRoutes.getAUser);
// router.post("/order/checkout", authMiddleware, authRoutes.checkout);
// router.post("/order/payment-verification", authMiddleware, authRoutes.paymentVerification);
router.delete("/delete-product-cart/:cartItemId", authMiddleware, authRoutes.removeProductFromCart);
router.delete("/empty-cart", authMiddleware, authRoutes.emptyCart);
router.put("/update-product-cart/:cartItemId/:newQuantity", authMiddleware, authRoutes.updateProductQuantityFromCart);
router.post("/cart/create-order", authMiddleware, authRoutes.createOrder);
router.post("/cart", authMiddleware, authRoutes.userCart);
router.get("/wishlist", authMiddleware, authRoutes.getWishList);
router.get("/cart", authMiddleware, authRoutes.getUserCart);
router.put("/password", authMiddleware, authRoutes.updatePassword);
router.put("/update-user", authMiddleware, authRoutes.updateAUser);
router.put("/save-address", authMiddleware, authRoutes.saveAddress);
// router.get("/all-orders", authMiddleware, isAdmin, authRoutes.getAllOrders);
router.get("/orders", authMiddleware, isAdmin, authRoutes.getAllOrders);
router.get("/orders/:id", authMiddleware, isAdmin, authRoutes.getOrder);
router.get("/monthwise-order-data", authMiddleware, isAdmin, authRoutes.getMonthWiseOrderData);
router.put("/block-user/:id", authMiddleware, isAdmin, authRoutes.blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, authRoutes.unblockUser);
router.put(
  "/order/update-status/:id",
  authMiddleware,
  isAdmin,
  authRoutes.updateOrderStatus
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