import { axiosInstanceWithAuth, axiosInstanceWithoutAuth } from "../../utils/axiosConfig"


const getProducts = async () => {
    try {
        const response = await axiosInstanceWithoutAuth.get("product");
        return response.data;
    } catch (error) {
        console.error("Error during fetching the product: ", error);
    }
};

const getProduct = async (productId) => {
    try {
        const response = await axiosInstanceWithoutAuth.get(`product/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error during fetching all the products: ", error);
    }
};

const addToWishList = async (productId) => {
    try {
        const response = await axiosInstanceWithAuth.put("product/wishlist", { productId });
        return response.data;
    } catch (error) {
        console.error("Error during adding product to wishlist: ", error);
    }
};


export const productService = {
    getProducts,
    getProduct,
    addToWishList
}