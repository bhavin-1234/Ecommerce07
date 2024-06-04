import { axiosInstanceWithAuth, axiosInstanceWithoutAuth } from "../../utils/axiosConfig"

const registerUser = async (userData) => {
    try {
        const response = await axiosInstanceWithoutAuth.post("user/register", userData);
        return response.data;
    } catch (error) {
        console.error("Error during registering a user: ", error);
    }
};

const loginUser = async (loginData) => {
    try {
        const response = await axiosInstanceWithoutAuth.post("user/login", loginData);
        localStorage.setItem("digiticToken", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error("Error during login a user: ", error);
    }
};

const getUserWishList = async () => {
    try {
        const response = await axiosInstanceWithAuth.get("user/wishlist");
        return response.data;
    } catch (error) {
        console.error("Error during fetching user wishlist: ", error);
    }
};

const addToCart = async (cartData) => {
    try {
        const response = await axiosInstanceWithAuth.post("user/cart", cartData);
        return response.data;
    } catch (error) {
        console.error("Error during adding product to the cart: ", error);
    }
};

const getCart = async () => {
    try {
        const response = await axiosInstanceWithAuth.get("user/cart");
        return response.data;
    } catch (error) {
        console.error("Error during fetching the cart: ", error);
    }
};

const removeProductFromCart = async (cartItemId) => {
    try {
        const response = await axiosInstanceWithAuth.delete(`user/delete-product-cart/${cartItemId}`);
        return response.data;
    } catch (error) {
        console.error("Error during removing product from cart: ", error);
    }
};

const updateProductQuantityFromCart = async (cartItemDetail) => {
    try {
        const response = await axiosInstanceWithAuth.put(`user/update-product-cart/${cartItemDetail.cartItemId}/${cartItemDetail.newQuantity}`);
        return response.data;
    } catch (error) {
        console.error("Error during removing product from cart: ", error);
    }
};

const createOrder = async (orderDetails) => {
    try {
        const response = await axiosInstanceWithAuth.post("user/cart/create-order", orderDetails);
        return response.data;
    } catch (error) {
        console.error("Error during creating order: ", error);
    }
};

const geUserOrders = async () => {
    try {
        const response = await axiosInstanceWithAuth.get("user/get-my-orders",);
        return response.data;
    } catch (error) {
        console.error("Error during fetching user's all orders: ", error);
    }
};

const updateUser = async (userData) => {
    try {
        const response = await axiosInstanceWithAuth.put("user/update-user", userData);
        localStorage.setItem("digiticToken", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error("Error during updating user: ", error);
    }
};


export const userService = {
    registerUser,
    loginUser,
    getUserWishList,
    addToCart,
    getCart,
    removeProductFromCart,
    updateProductQuantityFromCart,
    createOrder,
    geUserOrders,
    updateUser
}