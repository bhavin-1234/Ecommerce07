import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dbConnect } from "./config/dbConnect.js";
const app = express();
const port = process.env.PORT || 8000;
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoute.js";
import blogRouter from "./routes/blogRoute.js";
import productCategoryRouter from "./routes/productCategoryRoute.js";
import blogCategoryRouter from "./routes/blogCategoryRoute.js";
import brandRouter from "./routes/brandRoute.js";
import couponRouter from "./routes/couponRoute.js";
import morgan from "morgan";

dbConnect();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/product-category", productCategoryRouter);
app.use("/api/blog-category", blogCategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
