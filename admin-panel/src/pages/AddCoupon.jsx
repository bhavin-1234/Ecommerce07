import CustomInput from '../components/CustomInput';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { createCoupon, getCoupon, resetState, updateCoupon } from '../features/coupon/couponSlice';
import { useNavigate, useParams } from 'react-router-dom';
import moment from "moment";


const AddCoupon = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const couponID = params.id;


    useEffect(() => {
        if (couponID) {
            dispatch(getCoupon(couponID));
        }
        else {
            dispatch(resetState());
        }
    }, [couponID, dispatch]);


    const newCoupon = useSelector(state => state.coupon);
    const { createdCoupon, isSuccess, isError, fetchedCoupon, updatedCoupon } = newCoupon;


    const initialValues = {
        name: fetchedCoupon?.name || "",
        // expiry: fetchedCoupon?.expiry ? moment(fetchedCoupon?.expiry).format("YYYY-MM-DDThh:mm") : "",
        // expiry: moment(fetchedCoupon?.expiry).format("YYYY-MM-DDThh:mm") || "",
        // expiry: "2024-05-31T11:20" || "",
        // expiry: fetchedCoupon?.expiry || "",
        expiryDate: fetchedCoupon?.expiryDate ? moment(fetchedCoupon?.expiryDate).format("YYYY-MM-DD") : "",
        expiryTime: fetchedCoupon?.expiryTime || "",
        // expiryTime: fetchedCoupon?.expiryTime ? moment(fetchedCoupon?.expiryTime).format("hh:mm") : "",
        expiryDateTime: fetchedCoupon?.expiryDateTime ? moment(fetchedCoupon?.expiryDateTime).format("YYYY-MM-DDThh:mm") : "",
        discount: fetchedCoupon?.discount || "",
    };


    // const initialValues = {
    //     name: fetchedCoupon?.name || "",
    //     expiry: fetchedCoupon?.expiry ? moment(fetchedCoupon?.expiry).format("YYYY-MM-DDThh:mm") : "",
    //     // expiry: moment(fetchedCoupon?.expiry).format("YYYY-MM-DDThh:mm") || "",
    //     // expiry: "2024-05-31T11:20" || "",
    //     // expiry: fetchedCoupon?.expiry || "",
    //     discount: fetchedCoupon?.discount || "",
    // };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Coupon Name is Required!"),
        expiryDate: Yup.date().required("Expiry Date is Required!"),
        expiryTime: Yup.string().required("Expiry Time is Required!"),
        expiryDateTime: Yup.date().required("Expiry Date and Time is Required!"),
        discount: Yup.number().required("Discount Percentage is Required!"),
    });



    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success("Coupon Created Successfully!", {
                onClose: () => formik.resetForm()
            });
        }

        isSuccess && updatedCoupon && toast.success("Coupon Updated Successfully!", {
            onClose: () => {
                formik.resetForm();
                navigate("/admin/coupon-list");
            }
        });

        isError && toast.error("Something Went Wrong!");
    }, [isSuccess, isError, createdCoupon, updatedCoupon]);


    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log(values);
            const data = { id: couponID, couponData: values };
            if (couponID) {
                dispatch(updateCoupon(data));
            } else {
                console.log(values);
                dispatch(createCoupon(values));
                setTimeout(() => {
                    dispatch(resetState());
                }, 3000);
            }
        }
    });


    return (
        <div>
            <h3 className="mb-4 title">{couponID ? "Edit" : "Add"} Coupon</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>

                    <CustomInput type="text" label="Enter Coupon Name" name="name" i_id="name" val={formik.values.name} onCh={formik.handleChange("name")} onBl={formik.handleBlur} />
                    {formik.errors.name && formik.touched.name && <div className='error'>{formik.errors.name}</div>}

                    <CustomInput type="date" label="Enter Expiry Date" name="expiryDate" i_id="expiryDate" val={formik.values.expiryDate} onCh={formik.handleChange("expiryDate")} onBl={formik.handleBlur} />
                    {formik.errors.expiryDate && formik.touched.expiryDate && <div className='error'>{formik.errors.expiryDate}</div>}

                    <CustomInput type="time" label="Enter Expiry Time" name="expiryTime" i_id="expiryTime" val={formik.values.expiryTime} onCh={formik.handleChange("expiryTime")} onBl={formik.handleBlur} />
                    {formik.errors.expiryTime && formik.touched.expiryTime && <div className='error'>{formik.errors.expiryTime}</div>}

                    <CustomInput type="datetime-local" label="Enter Expiry Date and Time" name="expiryDateTime" i_id="expiryDateTime" val={formik.values.expiryDateTime} onCh={formik.handleChange("expiryDateTime")} onBl={formik.handleBlur} />
                    {formik.errors.expiryDateTime && formik.touched.expiryDateTime && <div className='error'>{formik.errors.expiryDateTime}</div>}

                    <CustomInput type="number" label="Enter Discount (in %)" name="discount" i_id="discount" val={formik.values.discount.toString()} onCh={formik.handleChange("discount")} onBl={formik.handleBlur} />
                    {formik.errors.discount && formik.touched.discount && <div className='error'>{formik.errors.discount}</div>}


                    <button disabled={formik.isSubmitting || !formik.isValid} className='btn btn-success border-0 rounded-3 my-5' type="submit">{couponID ? "Edit" : "Add"} Coupon</button>
                </form>
            </div>
        </div>
    )
}

export default AddCoupon;
