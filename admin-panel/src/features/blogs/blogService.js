import { axiosInstanceWithAuth, axiosInstanceWithoutAuth } from '../../utils/axiosConfig';



const getBlogs = async () => {
    try {
        const response = await axiosInstanceWithoutAuth.get("blog");
        return response.data;
    } catch (error) {
        console.error("Error during fetching all blogs: ", error);
        throw error;
    }
};

const createBlog = async (blogData) => {
    try {
        const response = await axiosInstanceWithAuth.post("blog", blogData);
        return response.data;
    } catch (error) {
        console.error("Error during creating the blog: ", error);
        throw error;
    }
};

const blogService = {
    getBlogs,
    createBlog
};

export default blogService;

