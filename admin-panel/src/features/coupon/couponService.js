import { axiosInstanceWithAuth } from '../../utils/axiosConfig';


const getCoupons = async () => {
    try {

        const response = await axiosInstanceWithAuth.get("coupon");
        return response.data;
    } catch (error) {
        console.error("Error during fetching all coupons: ", error);
        throw error;
    }
};

const getCoupon = async (couponID) => {
    try {
        const response = await axiosInstanceWithAuth.get(`coupon/${couponID}`);
        return response.data;
    } catch (error) {
        console.error("Error during fetching a Coupon: ", error);
        throw error;
    }
};


const createCoupon = async (couponData) => {
    try {
        const response = await axiosInstanceWithAuth.post("coupon", couponData);
        return response.data;
    } catch (error) {
        console.error("Error during creating coupon: ", error);
        throw error;
    }
};

const updateCoupon = async (data) => {
    try {
        const response = await axiosInstanceWithAuth.put(`coupon/${data.id}`, data.couponData);
        return response.data;
    } catch (error) {
        console.error("Error during updating Coupon: ", error);
        throw error;
    }
};

const deleteCoupon = async (couponID) => {
    try {
        const response = await axiosInstanceWithAuth.delete(`coupon/${couponID}`);
        return response.data;
    } catch (error) {
        console.error("Error during deleting Coupon: ", error);
        throw error;
    }
};

const couponService = {
    getCoupons,
    getCoupon,
    createCoupon,
    updateCoupon,
    deleteCoupon,
};

export default couponService;

