import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import watch from '../images/watch.jpg';
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCart, removeProductFromCart, updateProductQuantityFromCart } from "../features/user/userSlice";
import { toast } from "react-toastify";

const Cart = () => {

    const dispatch = useDispatch();

    const [totalAmount, setTotalAmount] = useState(null);

    // const [cartItemDetail, setCartItemDetail] = useState({
    //     cartItemId: "",
    //     newQuantity: ""
    // });


    const { cartProducts, isSuccess, isError, removedProductCart } = useSelector(state => state.auth);



    useEffect(() => {
        dispatch(getCart());
    }, []);

    // useEffect(() => {
    //     if (cartItemDetail.cartItemId && cartItemDetail.newQuantity) {
    //         dispatch(updateProductQuantityFromCart(cartItemDetail));
    //     }
    // }, [cartItemDetail]);








    // useEffect(() => {
    //     if (isSuccess && removedProductCart) {
    //         toast.success("Product removed From Cart Successfully!", {
    //             onClose: () => {
    //                 dispatch(getCart());
    //             }
    //         });
    //     }

    //     // if (isSuccess && updatedProductCart) {
    //     //     toast.success("Product updated From Cart Successfully!", {
    //     //         onClose: () => {
    //     //             dispatch(getCart());
    //     //         }
    //     //     });
    //     // }

    //     if (isError) {
    //         toast.error("Something Went Wrong!");
    //     }

    // }, [isSuccess, isError, removedProductCart]);



    useEffect(() => {
        // let sum = 0;
        // cartProducts?.map(el => {
        //     sum += (el.price * el.quantity);
        // })
        const total = Array.isArray(cartProducts) && cartProducts?.reduce((accum, item) => {
            return accum += (item?.price * item?.quantity);
        }, 0);

        setTotalAmount(total);

    }, [cartProducts]);

    const handleQuantityChange = (quantity, id) => {
        dispatch(updateProductQuantityFromCart({ cartItemId: id, newQuantity: quantity }));
        setTimeout(() => {
            dispatch(getCart());
        }, 50);


    }



    return (
        <>
            <Meta title="Cart" />
            <BreadCrumb title="Cart" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                            <h4 className="cart-col-1">Product</h4>
                            <h4 className="cart-col-2">Price</h4>
                            <h4 className="cart-col-3">Quantity</h4>
                            <h4 className="cart-col-4">Total</h4>
                        </div>
                        {Array.isArray(cartProducts) && cartProducts?.map((cartItem, index) => (
                            <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                                <div className="cart-col-1 gap-15 d-flex align-items-center">
                                    <div className="w-25">
                                        <img src={watch} className="img-fluid" alt="watch" />
                                    </div>
                                    <div className="w-75">
                                        <p>{cartItem.productId.title}</p>
                                        <p className="d-flex gap-2">Color: <ul className="colors ps-0">
                                            <li style={{ backgroundColor: cartItem.color.title }}></li>
                                        </ul></p>
                                    </div>
                                </div>
                                <div className="cart-col-2">
                                    <h5 className="price">$ {cartItem.price}</h5>
                                </div>
                                <div className="cart-col-3 d-flex align-items-center gap-15">
                                    <div>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="quantity"
                                            min="1"
                                            max="10"
                                            value={cartItem?.quantity}
                                            // value={cartItemDetail?.newQuantity || cartItem?.quantity}
                                            // onChange={(e) => setCartItemDetail({ cartItemId: cartItem?._id, newQuantity: e.target.value })}
                                            onChange={(e) => handleQuantityChange(e.target.value, cartItem?._id)}
                                        />
                                    </div>
                                    <div><AiFillDelete onClick={() => {
                                        dispatch(removeProductFromCart(cartItem?._id))
                                        setTimeout(() => {
                                            dispatch(getCart());
                                        }, 50);
                                    }
                                    } className="text-danger fs-3" style={{ cursor: "pointer" }} /></div>
                                </div>
                                <div className="cart-col-4">
                                    <h5 className="price">$ {cartItem?.price * cartItem?.quantity}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-12 py-2 mt-4">
                        <div className="d-flex justify-content-between align-items-start">
                            <Link to="/product" className="button">Continue to Shopping</Link>
                            {!!totalAmount && <div>
                                {/* <h4>SubTotal: $ {totalAmount}</h4> */}
                                <h4>SubTotal: {Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD"
                                }).format(totalAmount)
                                }</h4>

                                <p>Taxes and Shipping calculated at checkout</p>
                                <Link to="/checkout" className="button">Checkout</Link>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Cart;
