import {
    cloudinaryUploadImg,
    cloudinaryDeleteImg,
} from "../utils/cloudinary.js";

const uploadImages = async (req, res) => {
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath);
        }
        const images = urls.map((file) => {
            return file;
        });
        res.json(images);
    } catch (error) {
        console.error("Error while uploading product images: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteImages = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = cloudinaryDeleteImg(id, "images");
        res.json({ message: "Deleted" });
    } catch (error) {
        console.error("Error while uploading product images: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { uploadImages, deleteImages };