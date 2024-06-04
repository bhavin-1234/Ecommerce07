import { axiosInstanceWithoutAuth } from "../../utils/axiosConfig"


const postEnquiry = async (enquiryData) => {
    try {
        const response = await axiosInstanceWithoutAuth.post("enquiry", enquiryData);
        return response.data;
    } catch (error) {
        console.error("Error during posting the enquiry: ", error);
    }
};




export const contactService = {
    postEnquiry,
}