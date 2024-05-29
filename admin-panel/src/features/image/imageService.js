import { axiosInstanceWithAuth } from '../../utils/axiosConfig';


const uploadImages = async (data) => {
    const responce = await axiosInstanceWithAuth.post("image/upload", data);
    return responce.data;
}

const deleteImages = async (data) => {
    const responce = await axiosInstanceWithAuth.delete(`image/delete/${data}`);
    return responce.data;
}

const imageService = {
    uploadImages,
    deleteImages
};

export default imageService;

