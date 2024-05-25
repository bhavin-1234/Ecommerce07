import { useState } from "react";
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


const SingleProduct = () => {
    const [orderedProduct, setOrderedProduct] = useState(true);
    const props = { width: 400, height: 600, zoomWidth: 600, img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg" };



    return (
        <>
            <Meta title="Product Name" />
            <BreadCrumb title="Product Name" />
            <Container className="main-product-wrapper py-5 home-wrapper-2">
                {/* <div className="container-xxl"> */}
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15">
                            <div><img src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpgjpg" className="img-fluid" alt="watch" /></div>
                            <div><img src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpgjpg" className="img-fluid" alt="watch" /></div>
                            <div><img src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpgjpg" className="img-fluid" alt="watch" /></div>
                            <div><img src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpgjpg" className="img-fluid" alt="watch" /></div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className="title">Kids Headphones Bulk 10 pack Multi Colored For Students</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price">$ 100</p>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        activeColor="#ffd700"
                                        value={3}
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
                                    <p className="product-data">Havells</p>
                                </div>
                                <div className="d-flex align-items-center my-2 gap-10">
                                    <h3 className="product-heading">Categories:</h3>
                                    <p className="product-data">Watch</p>
                                </div>
                                <div className="d-flex align-items-center my-2 gap-10">
                                    <h3 className="product-heading">Tags:</h3>
                                    <p className="product-data">Watch</p>
                                </div>
                                <div className="d-flex align-items-center my-2 gap-10">
                                    <h3 className="product-heading">Availability:</h3>
                                    <p className="product-data">In Stock</p>
                                </div>
                                <div className="d-flex flex-column mt-2 mb-3 gap-10">
                                    <h3 className="product-heading">Size</h3>
                                    <div className="d-flex flex-wrap gap-15">
                                        <span className="badge border border-1 bg-white text-dark border-secondary">S</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">M</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">L</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">XL</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">XXL</span>
                                    </div>
                                </div>
                                <div className="d-flex flex-column mt-2 mb-3 gap-10">
                                    <h3 className="product-heading">Color</h3>
                                    <Color />
                                </div>
                                <div className="d-flex align-items-center mt-2 mb-3 gap-15">
                                    <h3 className="product-heading">Quantity:</h3>
                                    <div>
                                        <input type="number" className="form-control" name="" min="1" max="10" style={{ width: "60px" }} id="" />
                                    </div>
                                    <div className="d-flex ms-5 align-items-center gap-30">
                                        <button className="button border-0" type="submit">Add to Cart</button>
                                        <button className="button signup">Buy It Now</button>
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
                                    <p className="product-data" style={{ cursor: "pointer" }} onClick={() => copyToClipboard("https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg")}>Copy Product Link</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </Container>
            <Container class1="description-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4>Description</h4>
                        <div className="bg-white p-3">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe minus ex numquam eaque ab maxime sint totam aut accusantium eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi deserunt perspiciatis laudantium eaque quod possimus.</p>
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
                                <form action="" className="d-flex flex-column gap-15">
                                    <div>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="#ffd700"
                                            value={3}
                                            edit={true}
                                        />
                                    </div>
                                    <div>
                                        <textarea name="" cols="30" rows="5" placeholder="Comments" className="form-control w-100" id=""></textarea>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="button border-0">Submit Review</button>
                                    </div>
                                </form>
                            </div>
                            <div className="reviews mt-4">
                                <div className="review">
                                    <div className="d-flex gap-10 align-items-center">
                                        <h6 className="mb-0">Navdeep</h6>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="#ffd700"
                                            value={3}
                                            edit={false}
                                        />
                                    </div>
                                    <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum et excepturi neque voluptas repudiandae, commodi placeat error ut, deleniti harum, distinctio alias unde nihil sunt at sapiente debitis quibusdam iusto?</p>
                                </div>
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
                    <ProductCard />
                </div>
            </Container>
        </>
    )
}

export default SingleProduct;
