import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import watch from "../images/watch.jpg";
import propTypes from "prop-types";



const SpecialProduct = (props) => {
    const { id, title, brand, totalRating, price, sold, quantity } = props;
    // console.log(quantity / quantity + sold * 100);
    return (
        <div className="col-6 mb-3">
            <div className="special-product-card">
                <div className="d-flex justify-content-between">
                    <div>
                        <img src={watch} className="img-fluid" alt="watch" />
                    </div>
                    <div className="special-product-content">
                        <h5 className="brand">{brand}</h5>
                        <h6 className="title">{title}</h6>
                        <ReactStars
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                            value={totalRating}
                            edit={false}
                        />
                        <p className="price">
                            <span className="red-p">
                                ${price}
                            </span>
                            {/* &nbsp; */}
                            {/* <strike>$200</strike> */}
                        </p>
                        {/* <div className="discount-till d-flex align-items-center gap-10">
                            <p className="mb-0"><b>5</b> days</p>
                            <div className="d-flex gap-10 align-items-center">
                                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                                <span className="badge rounded-circle p-3 bg-danger">1</span>
                            </div>
                        </div> */}
                        <div className="prod-count my-3">
                            <p>products: {quantity}</p>
                            <div
                                className="progress"
                                role="progressbar"
                            // aria-label="Basic example"
                            // aria-valuenow="25"
                            // aria-valuemin="0"
                            // aria-valuemax="100"
                            >
                                <div className="progress-bar" style={{ width: quantity / quantity + sold * 100 + "%" }}></div>
                            </div>
                        </div>
                        <Link to={`/product/${id}`} className="button">View </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

SpecialProduct.propTypes = {
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    brand: propTypes.string.isRequired,
    totalRating: propTypes.number.isRequired,
    price: propTypes.number.isRequired,
    sold: propTypes.number.isRequired,
    quantity: propTypes.number.isRequired,

}

export default SpecialProduct;
