const {
    cloudinaryUploadImg,
    cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const fs = require("fs");

const uploadImages = async (req, res) => {
    const folder = req.body?.folder;
    try {
        const uploader = (path) => cloudinaryUploadImg(path, folder);
        let urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            try {
                const newPath = await uploader(path);
                urls.push(newPath);
                fs.unlinkSync(path);
            } catch (error) {
                console.error("Error uploading images to Cloudinary: ", error);
                return res.status(500).json({ message: "Error uploading images to Cloudinary" });
            }
        }
        res.json(urls);
    } catch (error) {
        console.error("Error while uploading images: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



const deleteImages = async (req, res) => {
    const { folder, id } = req.params;
    // const { id } = req.params;
    // console.log(folder.concat("/", id));
    try {
        // await cloudinaryDeleteImg(id);
        await cloudinaryDeleteImg(folder.concat("/", id));
        // await cloudinaryDeleteImg(id);
        res.json({ message: "Deleted" });
    } catch (error) {
        console.error("Error while deleting images: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { uploadImages, deleteImages };