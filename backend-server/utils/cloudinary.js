const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cloudinaryUploadImg = async (fileToUploads, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileToUploads,
      {
        folder: folder,
        resource_type: "auto",
        transformation: [{ width: 300, height: 300, crop: "limit", quality: "auto", fetch_format: "auto", format: "jpeg" }]
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          }
        );
      });
  });
};

const cloudinaryDeleteImg = async (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) return reject(error);
      resolve(
        // result
        // {
        //   url: result.secure_url,
        //   asset_id: result.asset_id,
        //   public_id: result.public_id,
        // },
        // {
        //   resource_type: "auto",
        // }
      );
    });
  });
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
