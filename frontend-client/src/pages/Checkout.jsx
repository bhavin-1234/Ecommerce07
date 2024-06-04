import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { axiosInstanceWithAuth } from "../utils/axiosConfig";
import { createOrder } from "../features/user/userSlice";

const Checkout = () => {

    const dispatch = useDispatch();

    const { cartProducts } = useSelector(state => state.auth);

    const [totalAmount, setTotalAmount] = useState(null);

    const [productsFromCart, setProductsFromCart] = useState([]);



    // const [shippingInfo, setShippingInfo] = useState(null);
    // const [paymentInfo, setPaymentInfo] = useState({
    //     razorpayPaymentId: "",
    //     razorpayOrderId: ""
    // });







    const initialValues = {
        firstName: "",
        lastName: "",
        address: "",
        state: "",
        city: "",
        other: "",
        pincode: "",
        country: "",
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is Required!"),
        lastName: Yup.string().required("Last Name is Required!"),
        address: Yup.string().required("Address is Required!"),
        state: Yup.string().required("state is Required!"),
        city: Yup.string().required("city is Required!"),
        other: Yup.string(),
        pincode: Yup.number().required("pincode is Required!"),
        country: Yup.string().required("country is Required!"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            // setShippingInfo(values);
            checkOutHandler(values);
        }
    });

    // console.log("shippingInfo: ", shippingInfo);


    useEffect(() => {

        setProductsFromCart(cartProducts && cartProducts?.map(product => ({
            product: product.productId._id,
            color: product.color._id,
            quantity: product.quantity,
            price: product.price,
        })));

        // const abc = cartProducts && cartProducts?.map(product => ({
        //     product: product.productId._id,
        //     color: product.color.title,
        //     quantity: product.quantity,
        //     price: product.price,
        // }))



    }, [cartProducts]);








    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        })
    };

    const checkOutHandler = async (shippingInfo) => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load!");
            return;
        }
        const result = await axiosInstanceWithAuth.post("user/order/checkout", { totalAmount: totalAmount + 5 });

        if (!result) {
            alert("Something Went Wrong!");
            return;
        }

        const { amount, id: order_id, currency } = result.data.order;

        console.log(result);




        const options = {
            key: "rzp_test_BBFXgAXBmJkkB6", // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: currency,
            name: "Developer's Corner",
            description: "Test Transaction",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                };

                console.log("data:", data);


                const result = await axiosInstanceWithAuth.post("user/order/payment-verification", data);

                // setPaymentInfo({
                //     razorpayPaymentId: response.razorpay_payment_id,
                //     razorpayOrderId: response.razorpay_order_id,
                // });



                dispatch(createOrder({
                    totalPrice: totalAmount + 5,
                    totalPriceAfterDiscount: totalAmount + 5,
                    orderItems: productsFromCart,
                    // paymentInfo: paymentInfo,
                    paymentInfo: {
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                    },
                    shippingInfo
                }));

            },
            prefill: {
                name: "Dev Corner",
                email: "devcorner@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Developer's Corner Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    };






    useEffect(() => {
        // let sum = 0;
        // cartProducts?.map(el => {
        //     sum += (el.price * el.quantity);
        // })
        const total = cartProducts?.reduce((accum, item) => {
            return accum += (item?.price * item?.quantity);
        }, 0);

        setTotalAmount(total);

    }, [cartProducts]);

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const countryStateData = {
        india: [
            { delhi: ["delhi", "new delhi"] },
            { gujarat: ["surat", "ahmedabad"] },
        ],
        usa: [
            { alaska: ["adak", "akhiok"] },
            { nevada: ["caliente", "carlin"] }
        ],
        nepal: [
            { kailali: ["dhangadhi"] }
        ]
    };


    const handleCountryChange = (e) => {
        const countryName = e.target.value;
        setStates(countryStateData[countryName].map(el => Object.keys(el)[0]) || []);
        formik.setFieldValue("country", countryName);
        formik.setFieldValue("state", "");
        formik.setFieldValue("city", "");
        setCities([]);
    };



    const handleStateChange = (e) => {
        const stateName = e.target.value;
        const countryName = formik.values.country;
        setCities((countryStateData[countryName].find(el => el[stateName]))[stateName] || []);
        formik.setFieldValue("state", stateName);
        formik.setFieldValue("city", "");
    }

    const user = JSON.parse(localStorage.getItem("digiticToken"));




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
                            <p className="user-details total">{`${user.firstname} ${user.lastname} (${user.email})`}</p>
                            {/* <p className="user-details total">Navdeep Dahiya (monud0232@gmail.com)</p> */}
                            <h4 className="mb-3">Shipping Address</h4>
                            <form onSubmit={formik.handleSubmit} className="d-flex flex-wrap gap-15 justify-content-between">

                                <div className="flex-grow-1">
                                    <input type="text" name="firstName" value={formik.values.firstName} onChange={formik.handleChange("firstName")} onBlur={formik.handleBlur} className="form-control" placeholder="First Name" />
                                    {formik.errors.firstName && formik.touched.firstName && <div className="error">{formik.errors.firstName}</div>}

                                </div>
                                <div className="flex-grow-1">
                                    <input type="text" name="lastName" value={formik.values.lastName} onChange={formik.handleChange("lastName")} onBlur={formik.handleBlur} className="form-control" placeholder="Last Name" />
                                    {formik.errors.lastName && formik.touched.lastName && <div className="error">{formik.errors.lastName}</div>}

                                </div>
                                <div className="w-100">
                                    <input type="text" name="address" value={formik.values.address} onChange={formik.handleChange("address")} onBlur={formik.handleBlur} className="form-control" placeholder="Address" />
                                    {formik.errors.address && formik.touched.address && <div className="error">{formik.errors.address}</div>}

                                </div>
                                <div className="w-100">
                                    <input type="text" name="other" onChange={formik.handleChange("other")} className="form-control" placeholder="Apartment, Suite, etc." />
                                </div>
                                <div className="w-100">
                                    <select name="country" value={formik.values.country} onChange={handleCountryChange} onBlur={formik.handleBlur} className="form-control form-select">
                                        <option value="" disabled hidden>Select Country</option>
                                        {Object.keys(countryStateData).map(country => <option key={country} value={country}>{country}</option>)}
                                    </select>
                                    {formik.errors.country && formik.touched.country && <div className="error">{formik.errors.country}</div>}
                                </div>
                                <div className="flex-grow-1">
                                    <select name="state" value={formik.values.state} onChange={handleStateChange} onBlur={formik.handleBlur} className="form-control form-select" id="">
                                        <option value="" hidden disabled>Select State</option>
                                        {states?.map(state => <option key={state} value={state}>{state.charAt(0).toUpperCase() + state.slice(1)}</option>)}
                                    </select>
                                    {formik.errors.state && formik.touched.state && <div className="error">{formik.errors.state}</div>}
                                </div>
                                <div className="flex-grow-1">
                                    {/* <input type="text" name="city" value={formik.values.city} onChange={formik.handleChange("city")} onBlur={formik.handleBlur} className="form-control" placeholder="City" /> */}
                                    <select name="city" value={formik.values.city} onChange={formik.handleChange("city")} onBlur={formik.handleBlur} className="form-control form-select" id="">
                                        <option value="" hidden disabled>Select city</option>
                                        {cities?.map(city => <option key={city} value={city}>{city.charAt(0).toUpperCase() + city.slice(1)}</option>)}
                                    </select>
                                    {formik.errors.city && formik.touched.city && <div className="error">{formik.errors.city}</div>}
                                </div>
                                <div className="flex-grow-1">
                                    <input type="number" name="pincode" value={formik.values.pincode} onChange={formik.handleChange("pincode")} onBlur={formik.handleBlur} className="form-control" placeholder="Pincode" />
                                    {formik.errors.pincode && formik.touched.pincode && <div className="error">{formik.errors.pincode}</div>}

                                </div>
                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to="/cart" className="text-dark"><BiArrowBack className="me-2" />Return to Cart</Link>
                                        <div>
                                            <Link to="/cart" className="button border-0" >Continue to Shipping</Link>
                                            <button className="button border-0 ms-3" type="submit">Place Order</button>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border-bottom py-4">
                            {cartProducts?.map((cartItem, index) => (
                                <div key={index} className="d-flex align-items-center gap-10 mb-2">
                                    <div className="w-75 d-flex gap-30">
                                        <div className="w-25 position-relative">
                                            <span style={{ top: "0", left: "100%", transform: "translate(-50%, -50%)" }} className="badge bg-secondary text-white rounded-circle py-1  position-absolute">{cartItem?.quantity}</span>
                                            <img src={cartItem?.productId?.images[0]?.url} className="rounded-3" width={100} height={100} alt="watch" />
                                        </div>
                                        <div>
                                            <h5 className="total-price">{cartItem?.productId?.title}</h5>
                                            <p className="total-price">{cartItem?.color?.title}</p>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 text-end">
                                        <h5 className="total">$ {cartItem?.price * cartItem?.quantity}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-bottom py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="total">Subtotal</p>
                                <p className="total-price">$ {totalAmount ?? 0}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 total">Shipping</p>
                                <p className="mb-0 total-price">$ 5</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center py-4">
                            <h4 className="total">Total</h4>
                            <h5 className="total-price">$ {totalAmount ? (totalAmount + 5) : 0}</h5>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Checkout;
