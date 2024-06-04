import { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blogs/blogSlice";
import moment from "moment";


const Blog = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBlogs());
    }, []);

    const blogState = useSelector(state => state.blog?.blogs?.allBlog);


    return (
        <>
            <Meta title="Blogs" />
            <BreadCrumb title="Blogs" />
            <Container class1="blog-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-3">
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Find By Categories</h3>
                            <div>
                                <ul className="ps-0">
                                    <li>Watch</li>
                                    <li>TV</li>
                                    <li>Camera</li>
                                    <li>Laptop</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            {blogState?.map((blog, index) => (
                                <div key={index} className="col-6 mb-3">
                                    <BlogCard
                                        id={blog?._id}
                                        date={moment(blog?.createdAt).format("MMMM Do YYYY, h:mm a")}
                                        title={blog?.title}
                                        description={blog?.description.substr(0, 70) + "..."}
                                        image={blog?.images[0]?.url}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Blog;
