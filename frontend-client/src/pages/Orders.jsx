import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";
import { useEffect } from "react";
import { getUserOrders } from "../features/user/userSlice";

const Orders = () => {
    const dispatch = useDispatch();

    const userOrderState = useSelector(state => state.auth.getuserOrders);

    console.log(userOrderState);

    useEffect(() => {
        dispatch(getUserOrders());
    }, []);

    return (
        <>
            <Meta title="my Orders" />
            <BreadCrumb title="My Orders" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-3">
                                <h5>Order Id</h5>
                            </div>
                            <div className="col-3">
                                <h5>Total Amount</h5>
                            </div>
                            <div className="col-3">
                                <h5>Total Amount After Discount</h5>
                            </div>
                            <div className="col-3">
                                <h5>Status</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-3">
                        {Array.isArray(userOrderState) && userOrderState.map((order, index) => (
                            <div className="row my-3 pt-3" style={{ backgroundColor: "#febd69" }} key={index}>
                                <div className="col-3">
                                    <p>{order._id}</p>
                                </div>
                                <div className="col-3">
                                    <p>{order?.totalPrice}</p>
                                </div>
                                <div className="col-3">
                                    <p>{order.totalPriceAfterDiscount}</p>
                                </div>
                                <div className="col-3">
                                    <p>{order.orderStatus}</p>
                                </div>
                                <div className="col-12" style={{ backgroundColor: "#232f3e" }}>
                                    <div className="row pt-3 text-white">
                                        <div className="col-3">
                                            <p>Product Name</p>
                                        </div>
                                        <div className="col-3">
                                            <p>Quantity</p>
                                        </div>
                                        <div className="col-3">
                                            <p>Price</p>
                                        </div>
                                        <div className="col-3">
                                            <p>Color</p>
                                        </div>
                                        {order?.orderItems?.map((product, index) => (
                                            <div className="col-12" key={index}>
                                                <div className="row pb-3" >
                                                    <div className="col-3">
                                                        <p>{product.product.title}</p>
                                                    </div>
                                                    <div className="col-3">
                                                        <p>{product.quantity}</p>
                                                    </div>
                                                    <div className="col-3">
                                                        <p>{product.price}</p>
                                                    </div>
                                                    <div className="col-3">
                                                        <ul className="colors ps-3">
                                                            <li style={{ backgroundColor: product.color.title }}></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Orders;
