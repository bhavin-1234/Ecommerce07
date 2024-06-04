import { Link } from "react-router-dom";
import propTypes from "prop-types";

const BlogCard = (props) => {
    const { id, date, title, description, image } = props;
    return (
        <div className="blog-card">
            <div className="card-image">
                <img src={image} className="img-fluid w-100" alt="blog" />
            </div>
            <div className="blog-content">
                <p className="date">{date}</p>
                <h5 className="title">{title}</h5>
                <p className="desc">{description}</p>
                <Link to={`/blog/${id}`} className="button">Read More</Link>
            </div>
        </div>
    )
};

BlogCard.propTypes = {
    id: propTypes.string,
    date: propTypes.string,
    title: propTypes.string,
    description: propTypes.string,
    image: propTypes.string,
}

export default BlogCard;
