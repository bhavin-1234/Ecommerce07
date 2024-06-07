import ReactStars from "react-rating-stars-component";
import propTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import wish from "../images/wish.svg";
// import watch from "../images/watch.jpg";
// import speaker from "../images/speaker.jpg";
// import prodcompare from "../images/prodcompare.svg";
import view from "../images/view.svg";
// import addCart from "../images/add-cart.svg";
import { useDispatch } from "react-redux";
import { addToWishList } from "../features/products/productSlice";

const ProductCard = (props) => {
    const { grid, data } = props;
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const addToWish = (productId) => {
        // event.stopPropagation();
        // event.preventDefault();

        // alert(productId);
        dispatch(addToWishList(productId));
    };


    return (
        <>
            {data?.map((product, index) => (
                <div key={index} className={location.pathname === "/product" ? `gr-${grid}` : "col-3"} >
                    {/* <Link to={`/product/${product?._id}`} className="product-card position-relative"> */}
                    <div className="product-card position-relative">
                        <div className="wishlist-icon position-absolute">
                            <button type="button" className="border-0 bg-transparent" onClick={() => addToWish(product?._id)}>
                                <img src={wish} alt="wishlist" />
                            </button>
                        </div>
                        <div className="product-img">
                            <img src={product?.images[0].url} alt="product" />
                            <img src={product?.images[1].url} alt="product" />
                        </div>
                        <div className="product-details">
                            <h6 className="brand">{product?.brand}</h6>
                            <h5 className="product-title">
                                {product?.title}
                            </h5>
                            <ReactStars
                                count={5}
                                size={24}
                                activeColor="#ffd700"
                                value={Number(product?.totalRating)}
                                edit={false}
                            />
                            {/* if not convert into text when data send to database through api from front end */}
                            {/* <p className={`description d-${grid === 12 ? "block" : "none"}`}
                                dangerouslySetInnerHTML={{ __html: product?.description }}
                            >
                            </p> */}
                            <p className={`description d-${grid === 12 ? "block" : "none"}`}
                            >
                                {product?.description}
                            </p>
                            {/* {product?.description} */}
                            <p className="price">$ {product?.price}</p>
                        </div>
                        <div className="action-bar position-absolute">
                            <div className="d-flex flex-column gap-15">
                                {/* <button className="border-0 bg-transparent">
                                    <img src={prodcompare} alt="compare" />
                                </button> */}
                                <button className="border-0 bg-transparent">
                                    <img onClick={() => navigate(`/product/${product?._id}`)} src={view} alt="view" />
                                </button>
                                {/* <button className="border-0 bg-transparent">
                                    <img src={addCart} alt="addcart" />
                                </button> */}
                            </div>
                        </div>
                    </div>
                    {/* </Link> */}
                </div>
            ))}
        </>
    )
}

ProductCard.propTypes = {
    grid: propTypes.number,
    data: propTypes.arrayOf(
        propTypes.shape({
            _id: propTypes.string,
            images: propTypes.arrayOf(propTypes.shape({
                url: propTypes.string
            })),
            brand: propTypes.string,
            title: propTypes.string,
            totalRating: propTypes.string,
            rating: propTypes.number,
            description: propTypes.string,
            price: propTypes.number,
        })
    ),
}

export default ProductCard;
