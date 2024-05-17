import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dbConnect } from "./config/dbConnect.js";
const app = express();
const port = process.env.PORT || 8000;
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoute.js";
import morgan from "morgan";

dbConnect();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
