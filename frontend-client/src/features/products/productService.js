import { axiosInstanceWithAuth, axiosInstanceWithoutAuth } from "../../utils/axiosConfig"


const getProducts = async (data) => {
    try {
        const response = await axiosInstanceWithoutAuth.get(`product?${data?.brand ? `brand=${data?.brand}&&` : ""}${data?.tag ? `tag=${data?.tag}&&` : ""}${data?.category ? `category=${data?.category}&&` : ""}${data?.sort ? `sort=${data?.sort}&&` : ""}${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}`);
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

const rateProduct = async (data) => {
    try {
        const response = await axiosInstanceWithAuth.put("product/rating", data);
        return response.data;
    } catch (error) {
        console.error("Error during rating product: ", error);
    }
};


export const productService = {
    getProducts,
    getProduct,
    addToWishList,
    rateProduct
}