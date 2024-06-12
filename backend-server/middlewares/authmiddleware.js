const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      return res.json({
        message: "Not Authorized or Token expired, Please Login again...",
      });
    }
  } else {
    res.status(400).json({ message: "There is no Token attached to Headers" });
  }
};

const isAdmin = async (req, res, next) => {
  // console.log(req.user);
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    res.json({ message: "you are not an admin..." });
  } else {
    next();
  }
};

module.exports = { authMiddleware, isAdmin };
