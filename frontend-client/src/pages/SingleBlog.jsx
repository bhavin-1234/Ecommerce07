import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
// import blog1 from '../images/blog-1.jpg';
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBlog } from "../features/blogs/blogSlice";


const SingleBlog = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const blogId = params.id;

  useEffect(() => {
    if (blogId) {
      dispatch(getBlog(blogId));
    }
  }, [blogId]);

  const { fetchedBlog } = useSelector(state => state.blog);

  return (
    <>
      <Meta title={fetchedBlog?.title} />
      <BreadCrumb title={fetchedBlog?.title} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10"><HiOutlineArrowLeft className="fs-4" />Go back to Blogs</Link>
              <h3 className="title">{fetchedBlog?.title}</h3>
              <img src={fetchedBlog?.images[0].url} className="img-fluid w-100 my-4" alt="blog" />
              <p>{fetchedBlog?.description}</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default SingleBlog;
