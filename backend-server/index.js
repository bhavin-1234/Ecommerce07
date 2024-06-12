const dotenv = require("dotenv");
dotenv.config();
const { dbConnect } = require("./config/dbConnect");
const app = require("./app");
const port = process.env.PORT || 8000;
// const express = require("express");
// const app = express();
// const authRouter = require("./routes/authRoute");
// const productRouter = require("./routes/productRoute");
// const blogRouter = require("./routes/blogRoute");
// const productCategoryRouter = require("./routes/productCategoryRoute");
// const blogCategoryRouter = require("./routes/blogCategoryRoute");
// const brandRouter = require("./routes/brandRoute");
// const colorRouter = require("./routes/colorRoute");
// const couponRouter = require("./routes/couponRoute");
// const enqRouter = require("./routes/enqRoute");
// const imageRouter = require("./routes/imageRoute");
// const cookieParser = require("cookie-parser");
// const morgan = require("morgan");
// const cors = require("cors");

dbConnect().then(() => {
  app.listen(port, () => {
    console.log(`server is running at port ${port}`);
  });

}).catch(() => {
  console.log("MongoDB Connection Failed!!");
});

// app.use(morgan("dev"));
// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use("/api/user", authRouter);
// app.use("/api/product", productRouter);
// app.use("/api/blog", blogRouter);
// app.use("/api/product-category", productCategoryRouter);
// app.use("/api/blog-category", blogCategoryRouter);
// app.use("/api/brand", brandRouter);
// app.use("/api/coupon", couponRouter);
// app.use("/api/color", colorRouter);
// app.use("/api/enquiry", enqRouter);
// app.use("/api/image", imageRouter);

// app.listen(port, () => {
//   console.log(`server is running at port ${port}`);
// });
