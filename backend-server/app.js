const express = require("express");
const app = express();

const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const productCategoryRouter = require("./routes/productCategoryRoute");
const blogCategoryRouter = require("./routes/blogCategoryRoute");
const brandRouter = require("./routes/brandRoute");
const colorRouter = require("./routes/colorRoute");
const couponRouter = require("./routes/couponRoute");
const enqRouter = require("./routes/enqRoute");
const imageRouter = require("./routes/imageRoute");


const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

app.use(morgan("dev"));
// app.use(cors());
 app.use(cors({
     origin: "https://digitic-admin-panel.vercel.app",
     credentials: true
 }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.get("/", (req, res) => {
    res.send("Hello");
})

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/product-category", productCategoryRouter);
app.use("/api/blog-category", blogCategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/image", imageRouter);


module.exports = app;
