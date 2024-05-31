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

const getProduct = async (productId) => {
    try {
        const response = await axiosInstanceWithoutAuth.get(`product/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error during fetching a product: ", error);
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

const updateProduct = async (data) => {
    try {
        const response = await axiosInstanceWithAuth.put(`product/${data.id}`, data.productData);
        return response.data;
    } catch (error) {
        console.error("Error during updating a product: ", error);
        throw error;
    }
};

const deleteProduct = async (productId) => {
    try {
        const response = await axiosInstanceWithAuth.delete(`product/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error during deleting a product: ", error);
        throw error;
    }
};


const productService = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};

export default productService;

