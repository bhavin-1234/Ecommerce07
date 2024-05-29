import { axiosInstanceWithAuth, axiosInstanceWithoutAuth } from '../../utils/axiosConfig';



const getPCategories = async () => {
    try {

        const response = await axiosInstanceWithoutAuth.get("product-category");
        return response.data;
    } catch (error) {
        console.error("Error during fetching all product categories: ", error);
        throw error;
    }
};

const getPCategory = async (pCategoryID) => {
    try {

        const response = await axiosInstanceWithoutAuth.get(`product-category/${pCategoryID}`);
        return response.data;
    } catch (error) {
        console.error("Error during fetching a product category: ", error);
        throw error;
    }
};

const createPCategory = async (pCategoryData) => {
    try {

        const response = await axiosInstanceWithAuth.post("product-category", pCategoryData);
        return response.data;
    } catch (error) {
        console.error("Error during creaing product category: ", error);
        throw error;
    }
};

const updatePCategory = async (data) => {
    try {
        const response = await axiosInstanceWithAuth.put(`product-category/${data.id}`, { title: data.pCategoryData.title });
        return response.data;
    } catch (error) {
        console.error("Error during updating Product Category: ", error);
        throw error;
    }
};

const deletePCategory = async (pCategoryId) => {
    try {
        const response = await axiosInstanceWithAuth.delete(`product-category/${pCategoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error during deleting Product Category: ", error);
        throw error;
    }
};

const pCategoryService = {
    getPCategories,
    createPCategory,
    updatePCategory,
    deletePCategory,
    getPCategory
};

export default pCategoryService;

