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

const getBlog = async (blogId) => {
    try {
        const response = await axiosInstanceWithoutAuth.get(`blog/${blogId}`);
        return response.data;
    } catch (error) {
        console.error("Error during fetching a blog: ", error);
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

const updateBlog = async (data) => {
    try {
        const response = await axiosInstanceWithAuth.put(`blog/${data.id}`, data.blogData);
        return response.data;
    } catch (error) {
        console.error("Error during updating a blog: ", error);
        throw error;
    }
};

const deleteBlog = async (blogId) => {
    try {
        const response = await axiosInstanceWithAuth.delete(`blog/${blogId}`);
        return response.data;
    } catch (error) {
        console.error("Error during deleting a blog: ", error);
        throw error;
    }
};

const blogService = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
};

export default blogService;

