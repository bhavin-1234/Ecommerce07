import { axiosInstanceWithAuth, axiosInstanceWithoutAuth } from '../../utils/axiosConfig';



const getBCategories = async () => {
    try {

        const response = await axiosInstanceWithoutAuth.get("blog-category");
        return response.data;
    } catch (error) {
        console.error("Error during fetching all blog categories: ", error);
        throw error;
    }
};

const getBCategory = async (bCategoryID) => {
    try {

        const response = await axiosInstanceWithoutAuth.get(`blog-category/${bCategoryID}`);
        return response.data;
    } catch (error) {
        console.error("Error during fetching a blog category: ", error);
        throw error;
    }
};

const createBCategory = async (bCategoryData) => {
    try {

        const response = await axiosInstanceWithAuth.post("blog-category", bCategoryData);
        return response.data;
    } catch (error) {
        console.error("Error during creating blog category: ", error);
        throw error;
    }
};

const updateBCategory = async (data) => {
    try {
        const response = await axiosInstanceWithAuth.put(`blog-category/${data.id}`, { title: data.bCategoryData.title });
        return response.data;
    } catch (error) {
        console.error("Error during updating Blog Category: ", error);
        throw error;
    }
};

const deleteBCategory = async (bCategoryId) => {
    try {
        const response = await axiosInstanceWithAuth.delete(`blog-category/${bCategoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error during deleting Blog Category: ", error);
        throw error;
    }
};

const bCategoryService = {
    getBCategories,
    getBCategory,
    createBCategory,
    updateBCategory,
    deleteBCategory,
};

export default bCategoryService;

