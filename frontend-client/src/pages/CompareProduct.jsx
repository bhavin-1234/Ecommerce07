import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";

const CompareProduct = () => {
    return (
        <>
            <Meta title="Compare Products" />
            <BreadCrumb title="Compare Products" />
            <div className="compare-product-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-3">
                            <div className="compare-product-card position-relative">
                                <img src="images/cross.svg" alt="cross" className="img-fluid position-absolute cross" />
                                <div className="product-card-image">
                                    <img src="images/watch.jpg" alt="watch" />
                                </div>
                                <div className="compare-product-details">
                                    <h5 className="title">Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet</h5>
                                    <h6 className="price my-3">$100.00</h6>
                                    <div>
                                        <div className="product-detail">
                                            <h5 className="mb-0">Brand:</h5>
                                            <p className="mb-0">Havells</p>
                                        </div>
                                        <div className="product-detail">
                                            <h5 className="mb-0">Type:</h5>
                                            <p className="mb-0">Tablet Computers</p>
                                        </div>
                                        <div className="product-detail">
                                            <h5 className="mb-0">SKU</h5>
                                            <p className="mb-0">SKU033</p>
                                        </div>
                                        <div className="product-detail">
                                            <h5 className="mb-0">Availability:</h5>
                                            <p className="mb-0">In Stock</p>
                                        </div>
                                        <div className="product-detail">
                                            <h5 className="mb-0">Color</h5>
                                            <Color />
                                        </div>
                                        <div className="product-detail">
                                            <h5 className="mb-0">Size</h5>
                                            <div className="d-flex gap-10">
                                                <p className="mb-0">S</p>
                                                <p className="mb-0">M</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="compare-product-card position-relative">
                                <img src="images/cross.svg" alt="cross" className="img-fluid position-absolute cross" />
                                <div className="product-card-image">
                                    <img src="images/watch.jpg" alt="watch" />
                                </div>
                                <div className="compare-product-details">
                                    <h5 className="title">Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet</h5>
                                    <h6 className="price my-3">$100.00</h6>
                                    <div>
                                        <div className="product-detail">
                                            <h5 className="mb-0">Brand:</h5>
                                            <p className="mb-0">Havells</p>
                                        </div>
                                        <div className="product-detail">
                                            <h5 className="mb-0">Type:</h5>
                                            <p className="mb-0">Tablet Computers</p>
                                        </div>
                                        <div className="product-detail">
                                            <h5 className="mb-0">SKU</h5>
                                            <p className="mb-0">SKU033</p>
                                        </div>
                                        <div className="product-detail">
                                            <h5 className="mb-0">Availability:</h5>
                                            <p className="mb-0">In Stock</p>
                                        </div>
                                        <div className="product-detail">
                                            <h5 className="mb-0">Color</h5>
                                            <Color />
                                        </div>
                                        <div className="product-detail">
                                            <h5 className="mb-0">Size</h5>
                                            <div className="d-flex gap-10">
                                                <p className="mb-0">S</p>
                                                <p className="mb-0">M</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompareProduct;
