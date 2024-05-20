import multer from "multer";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createDirIfNotExist = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const multerStorage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const destinationPath = path.join(
        __dirname,
        `../ public / images / ${folder}`
      );
      createDirIfNotExist(destinationPath);
      cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${file.fieldname}-${uniqueSuffix}.jpeg`);
    },
  });

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = (folder) =>
  multer({
    storage: multerStorage(folder),
    fileFilter: multerFilter,
    limits: { fileSize: 2000000 },
  });

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();

  const productDir = path.join(__dirname, "../public/images/products");
  createDirIfNotExist(productDir);

  try {
    await Promise.all(
      req.files.map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(path.join(productDir, file.filename));
        fs.unlinkSync(path.join(productDir, file.filename));
      })
    );
    next();
  } catch (error) {
    next(error);
  }
};

const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();

  const blogDir = path.join(__dirname, "../public/images/blogs");
  createDirIfNotExist(blogDir);

  try {
    await Promise.all(
      req.files.map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(path.join(blogDir, file.filename));
        fs.unlinkSync(path.join(blogDir, file.filename));
      })
    );
    next();
  } catch (error) {
    next(error);
  }
};

export { uploadPhoto, productImgResize, blogImgResize };
