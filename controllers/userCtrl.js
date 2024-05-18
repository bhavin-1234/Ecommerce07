import { generateToken } from "../config/jwtToken.js";
import { generateRefreshToken } from "../config/refreshToken.js";
import User from "../models/UserModel.js";
import { validateMongoDBID } from "../utils/validatemongodbid.js";
import jwt from "jsonwebtoken";
import sendEmail from "./emailCtrl.js";
import crypto from "crypto";

// create a user
const createUser = async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    // create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    //user already exists
    res.json({ msg: "User already exists!!", success: false });
  }
};

// login a user
const loginUserCtrl = async (req, res) => {
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
    res.json(updatedUser);
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
export {
  createUser,
  loginUserCtrl,
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
};
