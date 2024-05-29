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


const createCoupon = async (couponData) => {
    try {
        const response = await axiosInstanceWithAuth.post("coupon", couponData);
        return response.data;
    } catch (error) {
        console.error("Error during creating coupon: ", error);
        throw error;
    }
};

const couponService = {
    getCoupons,
    createCoupon
};

export default couponService;

