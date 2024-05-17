import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

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
      res.json({
        message: "Not Authorized token expired, Please Login again...",
      });
    }
  } else {
    res.json({ message: "there is no token attached to headers" });
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

export { authMiddleware, isAdmin };
