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

const createBCategory = async (bCategoryData) => {
    try {

        const response = await axiosInstanceWithAuth.post("blog-category", bCategoryData);
        return response.data;
    } catch (error) {
        console.error("Error during creating blog category: ", error);
        throw error;
    }
};

const bCategoryService = {
    getBCategories,
    createBCategory
};

export default bCategoryService;

