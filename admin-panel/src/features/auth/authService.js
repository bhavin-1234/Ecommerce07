import { axiosInstanceWithAuth, axiosInstanceWithoutAuth } from '../../utils/axiosConfig';

const login = async (userData) => {
    try {

        const response = await axiosInstanceWithoutAuth.post("user/admin-login", userData);
        if (response.data && response.data.id) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error("Error during login: ", error);
        throw error;
    }
}


const getOrders = async () => {
    try {
        const response = await axiosInstanceWithAuth.get("user/orders");
        return response.data;
    } catch (error) {
        console.error("Error during fetching all orders: ", error);
        throw error;
    }
};

const getOrder = async (id) => {
    try {
        const response = await axiosInstanceWithAuth.get(`user/orders/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error during fetching the order: ", error);
        throw error;
    }
};

const updateOrderStatus = async (data) => {
    try {
        const response = await axiosInstanceWithAuth.put(`user/order/update-status/${data?.id}`, { status: data?.status });
        return response.data;
    } catch (error) {
        console.error("Error during updating the order status: ", error);
        throw error;
    }
};

const getMonthlyOrderData = async () => {
    try {
        const response = await axiosInstanceWithAuth.get(`user/monthwise-order-data`);
        return response.data;
    } catch (error) {
        console.error("Error during fetching monthly orders: ", error);
        throw error;
    }
};

const getYearlyOrderData = async () => {
    try {
        const response = await axiosInstanceWithAuth.get(`user/yealy-order-count`);
        return response.data;
    } catch (error) {
        console.error("Error during fetching yearly orders: ", error);
        throw error;
    }
};



const authService = {
    login,
    getOrders,
    getOrder,
    getMonthlyOrderData,
    getYearlyOrderData,
    updateOrderStatus
};

export default authService;

