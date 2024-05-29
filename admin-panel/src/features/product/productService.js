import { axiosInstanceWithoutAuth, axiosInstanceWithAuth } from '../../utils/axiosConfig';



const getProducts = async () => {
    try {

        const response = await axiosInstanceWithoutAuth.get("product");
        return response.data;
    } catch (error) {
        console.error("Error during fetching all products: ", error);
        throw error;
    }
}

const createProduct = async (productData) => {
    try {

        const response = await axiosInstanceWithAuth.post("product", productData);
        return response.data;
    } catch (error) {
        console.error("Error during creating product: ", error);
        throw error;
    }
};

const productService = {
    getProducts,
    createProduct
};

export default productService;

