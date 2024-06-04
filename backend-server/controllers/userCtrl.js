const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const User = require("../models/UserModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const { validateMongoDBID } = require("../utils/validateMongoDBID");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailCtrl");
const crypto = require("crypto");
const uniqid = require("uniqid");
const Order = require("../models/orderModel");

// create a user
const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      // create a new user
      const newUser = await User.create(req.body);
      return res.status(201).json(newUser);
    } else {
      //user already exists
      return res.status(400).json({ message: "User already exists!!", success: false });
    }
  } catch (error) {
    console.error("Error while creating a user: ", error);
    res.status(500).json({ message: "Internal Server Error!", success: false, error: error.message });
  }
};

// login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findUser?._id);
      const updateUser = await User.findOneAndUpdate(
        findUser?._id,
        {
          refreshToken,
        },
        {
          new: true,
        }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        id: findUser?._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        mobile: findUser?.mobile,
        token: generateToken(findUser?._id),
      });
    } else {
      res.status(401).json({ message: "Invalid Credential", success: false });
    }
  } catch (error) {
    console.error("Error while logging a user: ", error);
    res.status(500).json({ message: "Internal Server Error!", success: false, error: error.message });

  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await User.findOne({ email });
  if (findAdmin?.role !== "admin") {
    return res.json({ message: "Not Authorised!!" });
  }
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateUser = await User.findOneAndUpdate(
      findAdmin?._id,
      {
        refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    res.json({ message: "Invalid Credential", success: false });
  }
};

const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    return res.json({ message: "No Refresh Token in Cookies!!" });
  }
  const refreshToken = cookies.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.json({ message: "User not matched with Token!!" });
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err || user?.id !== decoded.id) {
      res.json("Something went wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
};

// logout functionality

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    return res.json({ message: "No Refresh Token in Cookies!!" });
  }
  const refreshToken = cookies.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.sendStatus(204);
};

// update a user
const updateAUser = async (req, res) => {
  const { _id } = req.user;
  try {
    validateMongoDBID(_id);
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );
    res.json({
      id: updatedUser?._id,
      firstname: updatedUser?.firstname,
      lastname: updatedUser?.lastname,
      email: updatedUser?.email,
      mobile: updatedUser?.mobile,
      token: generateToken(updatedUser?._id),
    });
  } catch (error) {
    console.error("Error while updating a user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all user
const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find({});
    res.json(allUser);
  } catch (error) {
    console.error("Error while fetching all user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get a single user
const getAUser = async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBID(id);
    const singleUser = await User.findById(id);
    res.json(singleUser);
  } catch (error) {
    console.error("Error while fetching a user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete a single user
const deleteAUser = async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBID(id);
    const deleteUser = await User.findByIdAndDelete(id);
    res.json(deleteUser);
  } catch (error) {
    console.error("Error while deleting a user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// block a user
const blockUser = async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBID(id);
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({ message: "user blocked" });
  } catch (error) {
    console.error("Error while blocking a user: ", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

// unblock a user
const unblockUser = async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBID(id);
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({ message: "user unblocked" });
  } catch (error) {
    console.error("Error while unblocking a user: ", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

const updatePassword = async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDBID(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
};

const forgotPasswordToken = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User not found with this email" });
  }
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetUrl = `Hi, Please follow link to reset Your Password. This link is valid till 10 minutes from now. <a hre='http://localhost:5000/api/user/reset-password/${token}'>click here</a>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      html: resetUrl,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    console.error("Error while creating password reset token: ", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    return res.json({ message: "Token expired! Please try again later" });
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
};

// save user address

const saveAddress = async (req, res) => {
  const { _id } = req.user;
  try {
    validateMongoDBID(_id);
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error("Error while updating a user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getWishList = async (req, res) => {
  const { _id } = req.user;
  try {
    validateMongoDBID(_id);
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    console.error("Error while fetching wishlist items: ", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

const userCart = async (req, res) => {
  const { productId, quantity, price, color } = req.body;
  const { _id } = req.user;
  try {
    validateMongoDBID(_id);
    let newCart = await new Cart({
      userId: _id,
      productId,
      color,
      price,
      quantity,
    }).save();
    res.json(newCart);
  } catch (error) {
    console.error("Error while add item to the cart: ", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

const getUserCart = async (req, res) => {
  const { _id } = req.user;
  try {
    validateMongoDBID(_id);
    const cart = await Cart.find({ userId: _id })
      .populate([
        { path: "productId", model: "Product" },
        { path: "color", model: "Color" }
      ]);
    // .populate({ path: "productId", model: "Product" });
    // .populate(path: "color", model: "Color");
    // .populate("product").populate("color");
    res.json(cart);
  } catch (error) {
    console.error("Error while fetching user cart: ", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};


const removeProductFromCart = async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  try {
    validateMongoDBID(_id);
    validateMongoDBID(cartItemId);
    const deleteProductFromCart = await Cart.deleteOne({ userId: _id, _id: cartItemId });
    res.json(deleteProductFromCart);

  } catch (error) {
    console.error("Error while remove product from the cart: ", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};


const updateProductQuantityFromCart = async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, newQuantity } = req.params;
  try {
    validateMongoDBID(_id);
    validateMongoDBID(cartItemId);
    // const cartItem = await Cart.findOne({ userId: _id, _id: cartItemId });
    // cartItem.quantity = newQuantity;
    // cartItem.save();
    const cartItem = await Cart.findOneAndUpdate({ userId: _id, _id: cartItemId }, { quantity: newQuantity }, { new: true });
    res.json(cartItem);

  } catch (error) {
    console.error("Error while update product quantity to the cart: ", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

const createOrder = async (req, res) => {
  const { _id } = req.user;
  const { shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount, paymentInfo } = req.body;
  try {
    validateMongoDBID(_id);
    const order = await Order.create({ shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount, paymentInfo, user: _id });
    res.json(order);
  } catch (error) {
    console.error("Error while create order: ", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

const getMyOrders = async (req, res) => {
  const { _id } = req.user;
  try {
    validateMongoDBID(_id);
    const orders = await Order.find({ user: _id }).populate("user").populate("orderItems.product").populate("orderItems.color");
    res.json(orders);
  } catch (error) {
    console.error("Error while fetching the user's orders: ", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};



// const emptyCart = async (req, res) => {
//   const { _id } = req.user;
//   try {
//     validateMongoDBID(_id);
//     const user = await User.findById(_id);
//     const cart = await Cart.findOneAndDelete({ orderBy: user._id });
//     res.json(cart);
//   } catch (error) {
//     console.error("Error while empty the cart: ", error);
//     res.status(500).json({ message: "Internal server Error" });
//   }
// };

// const applyCoupon = async (req, res) => {
//   const { _id } = req.user;
//   const { coupon } = req.body;
//   try {
//     validateMongoDBID(_id);
//     const validCoupon = await Coupon.findOne({ name: coupon });
//     if (validCoupon === null) {
//       return res.json({ message: "Invalid Coupon!!" });
//     }
//     const user = await User.findById(_id);
//     const { cartTotal } = await Cart.findOne({ orderBy: user._id });
//     console.log("cartTotal: ", cartTotal);
//     const totalAfterDiscount = (
//       cartTotal -
//       (cartTotal * validCoupon?.discount) / 100
//     ).toFixed(2);
//     await Cart.findOneAndUpdate(
//       { orderBy: user._id },
//       { totalAfterDiscount },
//       { new: true }
//     );
//     res.json(totalAfterDiscount);
//   } catch (error) {
//     console.error("Error while applying the coupon: ", error);
//     res.status(500).json({ message: "Internal server Error" });
//   }
// };

// const createOrder = async (req, res) => {
//   const { _id } = req.user;
//   const { COD, couponApplied } = req.body;
//   try {
//     validateMongoDBID(_id);
//     if (!COD) return res.json("Create Cash Order Failed!!");
//     const user = await User.findById(_id);
//     const userCart = await Cart.findOne({ orderBy: user._id });
//     let finalAmount = 0;
//     if (couponApplied && userCart.totalAfterDiscount) {
//       finalAmount = userCart.totalAfterDiscount;
//     } else {
//       finalAmount = userCart.cartTotal;
//     }
//     let newOrder = await new Order({
//       products: userCart.products,
//       paymentIntent: {
//         id: uniqid(),
//         method: "COD",
//         amount: finalAmount,
//         status: "Cash On Delivery",
//         created: Date.now(),
//         currency: "usd",
//       },
//       orderBy: user._id,
//       orderStatus: "Cash On Delivery",
//     }).save();
//     let update = userCart.products.map((item) => {
//       return {
//         updateOne: {
//           filter: { _id: item.product._id },
//           update: { $inc: { quanity: -item.count, sold: +item.count } },
//         },
//       };
//     });
//     const updated = await Product.bulkWrite(update, {});
//     res.json({ message: "success" });
//   } catch (error) {
//     console.error("Error while creating the order: ", error);
//     res.status(500).json({ message: "Internal server Error" });
//   }
// };

// const getOrder = async (req, res) => {
//   const { _id } = req.user;
//   try {
//     validateMongoDBID(_id);
//     const userOrders = await Order.findOne({ orderBy: _id }).populate(
//       "products.product orderBy"
//     );
//     res.json(userOrders);
//   } catch (error) {
//     console.error("Error while fetching the order: ", error);
//     res.status(500).json({ message: "Internal server Error" });
//   }
// };

// const getAllOrders = async (req, res) => {
//   try {
//     const userOrders = await Order.find({})
//       .populate("products.product")
//       .populate("orderBy");
//     res.json(userOrders);
//   } catch (error) {
//     console.error("Error while fetching all the orders: ", error);
//     res.status(500).json({ message: "Internal server Error" });
//   }
// };

// const getOrderByUserId = async (req, res) => {
//   const { id } = req.params;
//   try {
//     validateMongoDBID(id);
//     const userOrders = await Order.findById(id).populate("products.product");
//     // const userOrders = await Order.findOne({ orderBy: id }).populate(
//     //   "products.product orderBy"
//     // );
//     res.json(userOrders);
//   } catch (error) {
//     console.error("Error while fetching the order: ", error);
//     res.status(500).json({ message: "Internal server Error" });
//   }
// };

// const updateOrderStatus = async (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;
//   try {
//     validateMongoDBID(id);
//     const update_order_status = await Order.findByIdAndUpdate(
//       id,
//       {
//         orderStatus: status,
//         $set: {
//           "paymentIntent.status": status,
//         },
//       },
//       { new: true }
//     ).populate("products.product");
//     res.json(update_order_status);
//   } catch (error) {
//     console.error("Error while updating order status: ", error);
//     res.status(500).json({ message: "Internal server Error" });
//   }
// };

module.exports = {
  createUser,
  loginUser,
  loginAdmin,
  getAllUser,
  getAUser,
  deleteAUser,
  updateAUser,
  logout,
  blockUser,
  unblockUser,
  refreshToken,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  // emptyCart,
  // applyCoupon,
  createOrder,
  // getOrder,
  // updateOrderStatus,
  // getAllOrders,
  // getOrderByUserId,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMyOrders
};
