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

const getColor = async (colorID) => {
    try {

        const response = await axiosInstanceWithoutAuth.get(`color/${colorID}`);
        return response.data;
    } catch (error) {
        console.error("Error during fetching a Color: ", error);
        throw error;
    }
};


const createColor = async (colorData) => {
    try {

        const response = await axiosInstanceWithAuth.post("color", colorData);
        return response.data;
    } catch (error) {
        console.error("Error during creating the color: ", error);
        throw error;
    }
};

const updateColor = async (data) => {
    try {
        const response = await axiosInstanceWithAuth.put(`color/${data.id}`, { title: data.colorData.title });
        return response.data;
    } catch (error) {
        console.error("Error during updating Color: ", error);
        throw error;
    }
};

const deleteColor = async (colorId) => {
    try {
        const response = await axiosInstanceWithAuth.delete(`color/${colorId}`);
        return response.data;
    } catch (error) {
        console.error("Error during deleting Color: ", error);
        throw error;
    }
};

const colorService = {
    getColors,
    getColor,
    createColor,
    updateColor,
    deleteColor
}

export default colorService;

