import { axiosInstanceWithAuth, axiosInstanceWithoutAuth } from '../../utils/axiosConfig';



const getPCategories = async () => {
    try {

        const response = await axiosInstanceWithoutAuth.get("product-category");
        return response.data;
    } catch (error) {
        console.error("Error during fetching all product categories: ", error);
        throw error;
    }
}

const createPCategory = async (pCategoryData) => {
    try {

        const response = await axiosInstanceWithAuth.post("product-category", pCategoryData);
        return response.data;
    } catch (error) {
        console.error("Error during creaing product category: ", error);
        throw error;
    }
}

const pCategoryService = {
    getPCategories,
    createPCategory
};

export default pCategoryService;

