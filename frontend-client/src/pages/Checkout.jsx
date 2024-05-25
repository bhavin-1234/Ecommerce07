import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";

const Checkout = () => {
    return (
        <>
            <Container class1="checkout-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-7">
                        <div className="checkout-left-data">
                            <h3 className="website-name">Dev Corner</h3>
                            <nav style={{
                                "--bs-breadcrumb-divider": ">"
                            }} aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item total-price"><Link to="/cart" className="text-dark">Cart</Link></li>&nbsp;/
                                    <li className="breadcrumb-item total-price active" aria-current="page">Information</li>&nbsp;/
                                    <li className="breadcrumb-item total-price active">Shipping</li>&nbsp;/
                                    <li className="breadcrumb-item total-price active" aria-current="page">Payment</li>
                                </ol>
                            </nav>
                            <h4 className="title total">Contact Information</h4>
                            <p className="user-details total">Navdeep Dahiya (monud0232@gmail.com)</p>
                            <h4 className="mb-3">Shipping Address</h4>
                            <form action="" className="d-flex flex-wrap gap-15 justify-content-between">
                                <div className="w-100">
                                    <select name="" className="form-control form-select" id="">
                                        <option value="" selected disabled>Select Country</option>
                                    </select>
                                </div>
                                <div className="flex-grow-1">
                                    <input type="text" className="form-control" placeholder="First Name" />
                                </div>
                                <div className="flex-grow-1">
                                    <input type="text" className="form-control" placeholder="Last Name" />
                                </div>
                                <div className="w-100">
                                    <input type="text" className="form-control" placeholder="Address" />
                                </div>
                                <div className="w-100">
                                    <input type="text" className="form-control" placeholder="Apartment, Suite, etc." />
                                </div>
                                <div className="flex-grow-1">
                                    <input type="text" className="form-control" placeholder="City" />
                                </div>
                                <div className="flex-grow-1">
                                    <select name="" className="form-control form-select" id="">
                                        <option value="" selected disabled>Select State</option>
                                    </select>
                                </div>
                                <div className="flex-grow-1">
                                    <input type="text" className="form-control" placeholder="Zipcode" />
                                </div>
                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to="/cart" className="text-dark"><BiArrowBack className="me-2" />Return to Cart</Link>
                                        <Link to="/cart" className="button">Continue to Shipping</Link>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border-bottom py-4">
                            <div className="d-flex align-items-center gap-10 mb-2">
                                <div className="w-75 d-flex gap-30">
                                    <div className="w-25 position-relative">
                                        <span style={{ top: "0", left: "100%", transform: "translate(-50%, -50%)" }} className="badge bg-secondary text-white rounded-circle py-1  position-absolute">1</span>
                                        <img src={watch} className="img-fluid rounded-3" alt="watch" />
                                    </div>
                                    <div>
                                        <h5 className="total-price">sdklfhsdjkf</h5>
                                        <p className="total-price">S / dfsd</p>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="total">$ 100</h5>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="total">Subtotal</p>
                                <p className="total-price">$ 100</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 total">Shipping</p>
                                <p className="mb-0 total-price">$ 10</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center py-4">
                            <h4 className="total">Total</h4>
                            <h5 className="total-price">$ 100</h5>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Checkout;
