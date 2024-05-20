import Blog from "../models/blogModel.js";
import cloudinaryUploadImg from "../utils/cloudinary.js";
import { validateMongoDBID } from "../utils/validateMongoDBID.js";

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
    )
      .populate({ path: "likes", select: "-password" })
      .populate({ path: "likes", select: "-password" });
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
  const loginUserId = req?.user?._id;

  try {
    validateMongoDBID(blogId);

    // Find the blog which you want to be liked
    let blog = await Blog.findById(blogId);
    //   find the login user
    // find if the user has liked the blog
    const isLiked = blog?.isLiked;
    // find if the user has disliked the blog
    const alreadyDisliked = blog?.disLikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyDisliked) {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { disLikes: loginUserId },
          isDisLiked: false,
        },
        { new: true }
      );
    }
    if (isLiked) {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
    } else {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
    }
    res.json(blog);
  } catch (error) {
    console.error("Error while like the Blog: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const disLikeBlog = async (req, res) => {
  const { blogId } = req.body;
  const loginUserId = req?.user?._id;

  try {
    validateMongoDBID(blogId);

    // Find the blog which you want to be liked
    let blog = await Blog.findById(blogId);
    //   find the login user
    // find if the user has liked the blog
    const isDisLiked = blog?.isDisLiked;
    // find if the user has disliked the blog
    const alreadyLiked = blog?.likes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
    }
    if (isDisLiked) {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { disLikes: loginUserId },
          isDisLiked: false,
        },
        { new: true }
      );
    } else {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { disLikes: loginUserId },
          isDisLiked: true,
        },
        { new: true }
      );
    }
    res.json(blog);
  } catch (error) {
    console.error("Error while dilike the Blog: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const uploadImages = async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBID(id);
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
    }
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => file),
      },
      { new: true }
    );
    res.json(findBlog);
  } catch (error) {
    console.error("Error while uploading blog images: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  uploadImages,
};
