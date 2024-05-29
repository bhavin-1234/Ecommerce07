const multer = require("multer");
const sharp = require("sharp");
// const path = require("path");
// const { fileURLToPath } = require("url");
const fs = require("fs");

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const createDirIfNotExist = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const multerStorage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      // const destinationPath = path.join(__dirname, `../public/images/${folder}`);
      const destinationPath = `../public/images/${folder}`;
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

const resizeImage = async (req, res, next, folderName) => {
  if (!req.files) return next();

  const imagesDir = `../public/images/${folderName}`;
  createDirIfNotExist(imagesDir);

  try {
    await Promise.all(
      req.files.map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`${folderName}/resized-${file.filename}`);
        fs.unlinkSync(`${folderName}/resized-${file.filename}`);
      })
    );
    next();
  } catch (error) {
    next(error);
  }
};


const productImgResize = async (req, res, next) => {
  resizeImage(req, res, next, "products");
};

const blogImgResize = async (req, res, next) => {
  resizeImage(req, res, next, "blogs");
};

module.exports = { uploadPhoto, productImgResize, blogImgResize };
