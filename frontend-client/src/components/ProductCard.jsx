import ReactStars from "react-rating-stars-component";
import propTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import wish from "../images/wish.svg";
import watch from "../images/watch.jpg";
import speaker from "../images/speaker.jpg";
import prodcompare from "../images/prodcompare.svg";
import view from "../images/view.svg";
import addCart from "../images/add-cart.svg";

const ProductCard = (props) => {
    const { grid } = props;
    const location = useLocation();
    return (
        <>
            <div className={location.pathname === "/store" ? `gr-${grid}` : "col-3"} >
                <Link to=":id" className="product-card position-relative">
                    <div className="wishlist-icon position-absolute">
                        <button className="border-0 bg-transparent">
                            <img src={wish} alt="wishlist" />
                        </button>
                    </div>
                    <div className="product-img">
                        <img src={watch} className="img-fluid" alt="product" />
                        <img src={speaker} className="img-fluid" alt="speaker" />
                    </div>
                    <div className="product-details">
                        <h6 className="brand">Havells</h6>
                        <h5 className="product-title">
                            Kids headphones bulk 10 pack multi colored for students
                        </h5>
                        <ReactStars
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                            value={3}
                            edit={false}
                        />
                        <p className={`description d-${grid === 12 ? "block" : "none"}`}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus, molestias officia quae doloremque vero corporis iste placeat et reprehenderit nesciunt.</p>
                        <p className="price">$100.00</p>
                    </div>
                    <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                            <button className="border-0 bg-transparent">
                                <img src={prodcompare} alt="compare" />
                            </button>
                            <button className="border-0 bg-transparent">
                                <img src={view} alt="view" />
                            </button>
                            <button className="border-0 bg-transparent">
                                <img src={addCart} alt="addcart" />
                            </button>
                        </div>
                    </div>
                </Link>
            </div>
            <div className={location.pathname === "/store" ? `gr-${grid}` : "col-3"} >
                <Link className="product-card position-relative">
                    <div className="wishlist-icon position-absolute">
                        <button className="border-0 bg-transparent">
                            <img src={wish} alt="wishlist" />
                        </button>
                    </div>
                    <div className="product-img">
                        <img src={watch} className="img-fluid" alt="product" />
                        <img src={speaker} className="img-fluid" alt="speaker" />
                    </div>
                    <div className="product-details">
                        <h6 className="brand">Havells</h6>
                        <h5 className="product-title">
                            Kids headphones bulk 10 pack multi colored for students
                        </h5>
                        <ReactStars
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                            value={3}
                            edit={false}
                        />
                        <p className={`description d-${grid === 12 ? "block" : "none"}`}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus, molestias officia quae doloremque vero corporis iste placeat et reprehenderit nesciunt.</p>
                        <p className="price">$100.00</p>
                    </div>
                    <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                            <button className="border-0 bg-transparent">
                                <img src={prodcompare} alt="compare" />
                            </button>
                            <button className="border-0 bg-transparent">
                                <img src={view} alt="view" />
                            </button>
                            <button className="border-0 bg-transparent">
                                <img src={addCart} alt="addcart" />
                            </button>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

ProductCard.propTypes = {
    grid: propTypes.number.isRequired
}

export default ProductCard;
