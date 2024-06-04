import { axiosInstanceWithAuth, axiosInstanceWithAuthAndMFD } from '../../utils/axiosConfig';


// const uploadImages = async (data) => {
//     const responce = await axiosInstanceWithAuth.post("image/upload", data);
//     return responce.data;
// }

const uploadImagesBlogs = async (formData) => {
    const responce = await axiosInstanceWithAuthAndMFD.post("image/upload/blog-image", formData);
    return responce.data;
};

const uploadImagesProducts = async (formData) => {
    const responce = await axiosInstanceWithAuthAndMFD.post("image/upload/product-image", formData);
    return responce.data;
};

const deleteImages = async (folderWithID) => {
    // const responce = await axiosInstanceWithAuth.delete(`image/delete/${folderWithID}`);
    const responce = await axiosInstanceWithAuth.delete(`image/delete/${folderWithID?.folder}/${folderWithID?.id}`);
    return responce.data;
};

const imageService = {
    uploadImagesBlogs,
    uploadImagesProducts,
    deleteImages
};

export default imageService;

