import { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from 'react-image-zoom';
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { copyToClipboard } from "../utils/copyToClipboard";
import Container from "../components/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getProducts, rateProduct } from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addToCart, getCart } from "../features/user/userSlice";


const SingleProduct = () => {

    // const [color, setColor] = useState(null);
    // const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();



    const initialValues = {
        color: null,
        quantity: 1

    };

    const [isAlreadyAddedToTheCart, setIsAlreadyAddedToTheCart] = useState(false);

    const [cartFormData, setCartFormData] = useState(initialValues);



    const params = useParams();
    const dispatch = useDispatch();

    const productId = params.id;

    useEffect(() => {
        if (productId) {
            dispatch(getProduct(productId));
            dispatch(getCart());
            dispatch(getProducts());
        }

    }, [productId]);

    const { fetchedProduct, products } = useSelector(state => state.product);
    const { cartProducts } = useSelector(state => state.auth);


    useEffect(() => {
        if (cartProducts && productId) {
            const isInCart = cartProducts?.some(el => el.productId._id === productId);

            setIsAlreadyAddedToTheCart(isInCart);
        }
    }, [cartProducts, productId]);


    const [star, setStar] = useState(3);
    const [comment, setComment] = useState("");

    const addRatingToProduct = (e) => {
        e.preventDefault();
        if (star === null) {
            toast.error("Please Add Star Rating!");
            return false;
        } else if (star === comment) {
            toast.error("Please Write Comment About the Product!");
            return false;
        }
        else {
            dispatch(rateProduct({ star: star, comment: comment, productId: productId }));
            setTimeout(() => {
                setStar(3);
                setComment("");
                dispatch(getProduct(productId));
            }, 2000);
        }


    };




    const [orderedProduct, setOrderedProduct] = useState(true);


    const { isSuccess, isError, addedToCart } = useSelector(state => state.auth);

    useEffect(() => {
        if (isSuccess && addedToCart) {
            toast.success("Added to Cart Successfully!", {
                onClose: () => {
                    setCartFormData(initialValues);
                }
            });
        }

        if (isError) {
            toast.error("Something Went Wrong!");
        }

    }, [isSuccess, isError, addedToCart]);


    const props = {
        width: 400,
        height: 600,
        zoomWidth: 600,
        img: fetchedProduct?.images[0]?.url || "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpgjpg"
    };



    const uploadToCart = () => {

        const addToCartAndNavigate = () => {
            dispatch(addToCart({
                productId: fetchedProduct?._id,
                color: cartFormData.color,
                quantity: cartFormData.quantity,
                price: fetchedProduct?.price
            }))
            navigate("/cart");
        };

        !cartFormData.color ? toast.error("Please choose color!") : addToCartAndNavigate();
    };


    return (
        <>
            <Meta title={fetchedProduct?.title} />
            <BreadCrumb title={fetchedProduct?.title} />
            <Container className="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15">
                            {fetchedProduct?.images?.map((image, index) => (
                                <div key={index}>
                                    <img src={image?.url} className="img-fluid" alt="watch" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className="title">{fetchedProduct?.title}</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price">$ {fetchedProduct?.price}</p>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        activeColor="#ffd700"
                                        value={Number(fetchedProduct?.totalRating)}
                                        edit={false}
                                    />
                                    <p className="mb-0 t-review">( 2 Reviews )</p>
                                </div>
                                <a href="#review" className="review-btn">Write a Review</a>
                            </div>
                            <div className="py-3">
                                <div className="d-flex align-items-center my-2 gap-10">
                                    <h3 className="product-heading">Type:</h3>
                                    <p className="product-data">Watch</p>
                                </div>
                                <div className="d-flex align-items-center my-2 gap-10">
                                    <h3 className="product-heading">Brand:</h3>
                                    <p className="product-data">{fetchedProduct?.brand}</p>
                                </div>
                                <div className="d-flex align-items-center my-2 gap-10">
                                    <h3 className="product-heading">Categories:</h3>
                                    <p className="product-data">{fetchedProduct?.category}</p>
                                </div>
                                <div className="d-flex align-items-center my-2 gap-10">
                                    <h3 className="product-heading">Tags:</h3>
                                    <p className="product-data">{fetchedProduct?.tag}</p>
                                </div>
                                <div className="d-flex align-items-center my-2 gap-10">
                                    <h3 className="product-heading">Availability:</h3>
                                    <p className="product-data">In Stock</p>
                                </div>


                                {!isAlreadyAddedToTheCart && <div className="d-flex flex-column mt-2 mb-3 gap-10">
                                    <h3 className="product-heading">Size</h3>
                                    <div className="d-flex flex-wrap gap-15">
                                        <span className="badge border border-1 bg-white text-dark border-secondary">S</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">M</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">L</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">XL</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">XXL</span>
                                    </div>
                                </div>}

                                {!isAlreadyAddedToTheCart && <div className="d-flex flex-column mt-2 mb-3 gap-10">
                                    <h3 className="product-heading">Color</h3>
                                    <Color
                                        setCartFormData={setCartFormData}
                                        colorData={fetchedProduct?.color}
                                    />
                                </div>}



                                <div className="d-flex align-items-center mt-2 mb-3 gap-15">
                                    {!isAlreadyAddedToTheCart && <>
                                        <h3 className="product-heading">Quantity:</h3>
                                        <div>
                                            <input
                                                type="number" className="form-control"
                                                name=""
                                                min="1"
                                                max="10"
                                                style={{ width: "60px" }}
                                                id=""
                                                // onChange={(e) => setQuantity(e.target.value)}
                                                // value={quantity}
                                                onChange={(e) => setCartFormData((prev) => ({ ...prev, quantity: e.target.value }))}
                                                value={cartFormData.quantity}

                                            />
                                        </div>
                                    </>}

                                    <div className={`d-flex align-items-center gap-30 ${!isAlreadyAddedToTheCart ? "ms-5" : "ms-0"}`}>
                                        <button className="button border-0"
                                            type="submit"
                                            onClick={() => {
                                                !isAlreadyAddedToTheCart ?
                                                    uploadToCart() : navigate("/cart");

                                            }}
                                        >
                                            {!isAlreadyAddedToTheCart ? "Add to Cart" : "Go to Cart"}
                                        </button>
                                        {/* <button className="button signup">Buy It Now</button> */}
                                    </div>
                                </div>



                                <div className="d-flex align-items-center siblingAnchor gap-15">
                                    <div>
                                        <a href="" ><TbGitCompare className="fs-5 me-2" />Add to Compare</a>
                                    </div>
                                    <div>
                                        <a href=""><CiHeart className="fs-5 me-2" />Add to Wishlist</a>
                                    </div>
                                </div>
                                <div className="d-flex flex-column my-3 gap-10">
                                    <h3 className="product-heading">Shipping & Returns:</h3>
                                    <p className="product-data">Free Shipping and Returns available on all orders! <br /> we ship all US domestic orders within <b>5-10 days!</b></p>
                                </div>
                                <div className="d-flex align-items-center my-3 gap-10">
                                    <h3 className="product-heading">Product Link:</h3>
                                    <p className="product-data" style={{ cursor: "pointer" }} onClick={() => copyToClipboard(window.location.href)}>Copy Product Link</p>
                                    {/* <p className="product-data" style={{ cursor: "pointer" }} onClick={() => copyToClipboard("https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg")}>Copy Product Link</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="description-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4>Description</h4>
                        <div className="bg-white p-3">
                            <p>{fetchedProduct?.description}</p>
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="review-wrapper home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 id="review">Reviews</h3>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h4 className="mb-2">Customer Reviews</h4>
                                    <div className="d-flex flex-column gap-10 align">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="#ffd700"
                                            value={4}
                                            edit={false}
                                        />
                                        <p className="mb-0">Based on 2 Reviews</p>
                                    </div>
                                </div>
                                {orderedProduct &&
                                    <div>
                                        <a href="" className="text-dark text-decoration-underline">Write a Review</a>
                                    </div>
                                }
                            </div>
                            <div className="review-form py-4">
                                <h4 className="mb-2">Write a Review</h4>
                                <form onSubmit={(e) => addRatingToProduct(e)} className="d-flex flex-column gap-15">
                                    <div>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="#ffd700"
                                            value={star}
                                            edit={true}
                                            onChange={(e) => setStar(e)}
                                        />
                                    </div>
                                    <div>
                                        <textarea name="comment" cols="30" rows="5" placeholder="Comments" className="form-control w-100" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="button border-0" type="submit">Submit Review</button>
                                    </div>
                                </form>
                            </div>
                            <div className="reviews mt-4">
                                {
                                    fetchedProduct?.ratings?.map((rating, index) => (
                                        <div key={index} className="review">
                                            <div className="d-flex gap-10 align-items-center ">
                                                <h6 className="mb-0">{rating?.postedBy?.firstname + " " + rating?.postedBy?.lastname}</h6>
                                                <ReactStars
                                                    count={5}
                                                    size={24}
                                                    activeColor="#ffd700"
                                                    value={rating?.star}
                                                    edit={false}
                                                />
                                            </div>
                                            <p className="mb-3">{rating?.comment}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="popular-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Our Popular Products</h3>
                    </div>
                    <ProductCard data={products.filter(el => el.tag === "popular")} />
                </div>
            </Container>
        </>
    )
}

export default SingleProduct;
