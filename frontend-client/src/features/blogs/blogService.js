import { axiosInstanceWithoutAuth } from "../../utils/axiosConfig"


const getBlogs = async () => {
    try {
        const response = await axiosInstanceWithoutAuth.get("blog");
        return response.data;
    } catch (error) {
        console.error("Error during fetching all the blogs: ", error);
    }
};

const getBlog = async (blogId) => {
    try {
        const response = await axiosInstanceWithoutAuth.get(`blog/${blogId}`);
        return response.data;
    } catch (error) {
        console.error("Error during fetching the blog: ", error);
    }
};



export const blogService = {
    getBlogs,
    getBlog,
}