import { axiosInstanceWithAuth, axiosInstanceWithoutAuth } from '../../utils/axiosConfig';



const getColors = async () => {
    try {

        const response = await axiosInstanceWithoutAuth.get("color");
        return response.data;
    } catch (error) {
        console.error("Error during fetching all colors: ", error);
        throw error;
    }
}

const createColor = async (colorData) => {
    try {

        const response = await axiosInstanceWithAuth.post("color", colorData);
        return response.data;
    } catch (error) {
        console.error("Error during creating the color: ", error);
        throw error;
    }
}

const colorService = {
    getColors,
    createColor
};

export default colorService;

