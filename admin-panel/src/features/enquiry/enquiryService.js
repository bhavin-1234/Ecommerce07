import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { axiosInstanceWithAuth, axiosInstanceWithoutAuth } from '../../utils/axiosConfig';



const getEnquiries = async () => {
    try {
        const response = await axios.get(`${base_url}enquiry`);
        return response.data;
    } catch (error) {
        console.error("Error during fetching all enquiries: ", error);
        throw error;
    }
};

const getEnquiry = async (enquiryId) => {
    try {
        const response = await axiosInstanceWithoutAuth.get(`enquiry/${enquiryId}`);
        return response.data;
    } catch (error) {
        console.error("Error during fetching a enquiry: ", error);
        throw error;
    }
};

const deleteEnquiry = async (enquiryId) => {
    try {
        const response = await axiosInstanceWithAuth.delete(`enquiry/${enquiryId}`);
        return response.data;
    } catch (error) {
        console.error("Error during deleting a enquiry: ", error);
        throw error;
    }
};

const updateEnquiry = async (data) => {
    try {
        const response = await axiosInstanceWithAuth.put(`enquiry/${data.id}`, { status: data.status });
        return response.data;
    } catch (error) {
        console.error("Error during updating a enquiry: ", error);
        throw error;
    }
};

const enquiryService = {
    getEnquiries,
    getEnquiry,
    deleteEnquiry,
    updateEnquiry
};

export default enquiryService;

