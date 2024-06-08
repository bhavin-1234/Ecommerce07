import { axiosInstanceWithAuth, axiosInstanceWithoutAuth } from "../../utils/axiosConfig"

const registerUser = async (userData) => {
    try {
        const response = await axiosInstanceWithoutAuth.post("user/register", userData);
        return response.data;
    } catch (error) {
        console.error("Error during registering a user: ", error.response.data);
        throw error.response.data;
    }
};

const loginUser = async (loginData) => {
    try {
        const response = await axiosInstanceWithoutAuth.post("user/login", loginData);
        // console.log(response);
        // localStorage.setItem("digiticToken", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error("Error during login a user: ", error.response.data);
        // console.log(error.response.data);
        // return Promise.reject(error.response.data);
        throw error.response.data;
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
        // localStorage.setItem("digiticToken", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error("Error during updating user: ", error);
        throw error.response.data;
    }
};

const forgotPassToken = async (data) => {
    try {
        const response = await axiosInstanceWithoutAuth.post("user/forgot-password-token", data);
        return response.data;
    } catch (error) {
        console.error("Error during forgot password token : ", error);
    }
};

const resetPassWord = async (data) => {
    try {
        const response = await axiosInstanceWithoutAuth.put(`user/reset-password/${data.id}`, { password: data?.password });
        return response.data;
    } catch (error) {
        console.error("Error during reset password : ", error);
    }
};

const emptyCart = async () => {
    try {
        const response = await axiosInstanceWithAuth.delete("user/empty-cart");
        return response.data;
    } catch (error) {
        console.error("Error during empty cart : ", error);
        throw error;
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
    updateUser,
    forgotPassToken,
    resetPassWord,
    emptyCart
}