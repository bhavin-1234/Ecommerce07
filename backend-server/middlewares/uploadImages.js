const multer = require("multer");
// const sharp = require("sharp");
const fs = require("fs");


const createDirIfNotExist = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const multerStorage = (folder) => multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = `./public/images/${folder}`;
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

const uploadPhoto = (folder) => multer({
  storage: multerStorage(folder),
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 },
});


module.exports = { uploadPhoto };

// const resizeImage = async (req, res, next, folderName) => {
//   if (!req.files) return next();

//   const imagesDir = `./public/images/${folderName}`;
//   createDirIfNotExist(imagesDir);

//   try {
//     await Promise.all(
//       req.files.map(async (file) => {
//         await sharp(file.path)
//           .resize(300, 300)
//           .toFormat("jpeg")
//           .jpeg({ quality: 90 })
//           .toFile(`${file.path}`);
//           // .toFile(`${imagesDir}/resized-${file.filename}`);
//         fs.unlinkSync(file.path);
//       })
//     );
//     next();
//   } catch (error) {
//     console.error("Error while resizing image: ", error);
//     next(error);
//   }
// };


// const productImgResize = async (req, res, next) => {
//   resizeImage(req, res, next, "products");
// };

// const blogImgResize = async (req, res, next) => {
//   resizeImage(req, res, next, "blogs");
// };



// , productImgResize, blogImgResize };
