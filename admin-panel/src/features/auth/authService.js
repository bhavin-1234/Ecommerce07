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
        const response = await axiosInstanceWithAuth.get("user/get-all-orders");
        return response.data;
    } catch (error) {
        console.error("Error during fetching all orders: ", error);
        throw error;
    }
};



const authService = {
    login,
    getOrders
};

export default authService;

