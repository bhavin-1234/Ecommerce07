import { axiosInstanceWithoutAuth, axiosInstanceWithAuth } from '../../utils/axiosConfig.js';


const getAllBrands = async () => {
    try {

        const response = await axiosInstanceWithoutAuth.get("brand");
        return response.data;
    } catch (error) {
        console.error("Error during fetching all brands: ", error);
        throw error;
    }
};

const getABrand = async (brandId) => {
    try {

        const response = await axiosInstanceWithoutAuth.get(`brand/${brandId}`);
        return response.data;
    } catch (error) {
        console.error("Error during fetching a brand: ", error);
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

const updateBrand = async (data) => {
    try {
        const response = await axiosInstanceWithAuth.put(`brand/${data.id}`, { title: data.brandData.title });
        return response.data;
    } catch (error) {
        console.error("Error during updating brand: ", error);
        throw error;
    }
};

const deleteBrand = async (brandId) => {
    try {
        const response = await axiosInstanceWithAuth.delete(`brand/${brandId}`);
        return response.data;
    } catch (error) {
        console.error("Error during deleting brand: ", error);
        throw error;
    }
};

const brandService = {
    getAllBrands,
    createBrand,
    getABrand,
    updateBrand,
    deleteBrand
};

export default brandService;

