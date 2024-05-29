import { axiosInstanceWithoutAuth, axiosInstanceWithAuth } from '../../utils/axiosConfig';


const getBrands = async () => {
    try {

        const response = await axiosInstanceWithoutAuth.get("brand");
        return response.data;
    } catch (error) {
        console.error("Error during fetching all brands: ", error);
        throw error;
    }
};


const createBrand = async (brandData) => {
    try {
        const response = await axiosInstanceWithAuth.post("brand", brandData);
        return response.data;
    } catch (error) {
        console.error("Error during creating brand: ", error);
        throw error;
    }
};

const brandService = {
    getBrands,
    createBrand
};

export default brandService;

