import { useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";


const SingleProduct = () => {
    const [orderedProduct, setOrderedProduct] = useState(true);
    return (
        <>
            <Meta title="Product Name" />
            <BreadCrumb title="Product Name" />
            <div className="main-product-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-6">

                        </div>
                        <div className="col-6"></div>
                    </div>

                    <section className="description-wrapper py-5 home-wrapper-2">
                        <div className="container-xxl">
                            <div className="row">
                                <div className="col-12">
                                    <h4>Description</h4>
                                    <div className="bg-white p-3">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe minus ex numquam eaque ab maxime sint totam aut accusantium eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi deserunt perspiciatis laudantium eaque quod possimus.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="review-wrapper home-wrapper-2">
                        <div className="container-xxl">
                            <div className="row">
                                <div className="col-12">
                                    <h3>Reviews</h3>
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
                        </div>
                    </section>

                    <section className="popular-wrapper py-5 home-wrapper-2">
                        <div className="container-xxl">
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="section-heading">Our Popular Products</h3>
                                </div>
                                <ProductCard />
                            </div>
                        </div>
                    </section>
                </div>


            </div>

        </>
    )
}

export default SingleProduct;
