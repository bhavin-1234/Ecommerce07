// import User from "../models/UserModel.js";
import Blog from "../models/blogModel.js";
import { validateMongoDBID } from "../utils/validatemongodbid.js";
// import { validateMongoDBID } from "../utils/validatemongodbid.js";

const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      status: "success",
      newBlog,
    });
  } catch (error) {
    console.error("Error while creating a Blog: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBID(id);
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      status: "success",
      updateBlog,
    });
  } catch (error) {
    console.error("Error while updating a Blog: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBID(id);
    const singleBlog = await Blog.findById(id);
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json({
      status: "success",
      updateViews,
    });
  } catch (error) {
    console.error("Error while fetching a single Blog: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllBlog = async (req, res) => {
  try {
    const allBlog = await Blog.find({});
    res.json({
      status: "success",
      allBlog,
    });
  } catch (error) {
    console.error("Error while fetching all Blog: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    validateMongoDBID(id);
    const deleteBlog = await Blog.findByIdAndDelete(id);
    res.json({
      status: "success",
      deleteBlog,
    });
  } catch (error) {
    console.error("Error while deleting a Blog: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const likeBlog = async (req, res) => {
  const { blogId } = req.body;
  validateMongoDBID(blogId);

  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  //   find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isLiked = blog?.isLiked;
  // find if the user has disliked the blog
  const alreadyDisliked = blog?.disLikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
    if (isLiked) {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { likes: loginUserId },
                isLiked: false,
            },
            { new: true }
        );
        res.json(blog);
    } else { 
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { likes: loginUserId },
                isLiked: true,
            },
            { new: true }
        );
        res.json(blog);

    }
};

export { createBlog, updateBlog, getBlog, getAllBlog, deleteBlog, likeBlog };
