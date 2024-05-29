import axios from 'axios';
import { base_url } from '../../utils/base_url';



const getEnquiries = async () => {
    try {
        const response = await axios.get(`${base_url}enquiry`);
        return response.data;
    } catch (error) {
        console.error("Error during fetching all enquiries: ", error);
        throw error;
    }
}

const enquiryService = {
    getEnquiries
};

export default enquiryService;

