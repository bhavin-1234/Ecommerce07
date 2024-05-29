import CustomInput from '../components/CustomInput';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { createCoupon, resetState } from '../features/coupon/couponSlice';

const AddCoupon = () => {

    const dispatch = useDispatch();

    const initialValues = {
        name: "",
        expiry: "",
        discount: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Coupon Name is Required!"),
        expiry: Yup.date().required("Expiry Date is Required!"),
        discount: Yup.number().required("Discount Percentage is Required!"),
    });


    const newCoupon = useSelector(state => state.coupon);
    const { createdCoupon, isSuccess, isError } = newCoupon;

    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success("Coupon Created Successfully!", {
                onClose: () => formik.resetForm()
            });
        }
        isError && toast.error("Something Went Wrong!");
    }, [isSuccess, isError, createdCoupon]);


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
            dispatch(createCoupon(values));
            setTimeout(() => {
                dispatch(resetState());
            }, 3000);
        }
    });

    console.log(formik);

    return (
        <div>
            <h3 className="mb-4 title">Add Coupon</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>

                    <CustomInput type="text" label="Enter Coupon Name" name="name" i_id="name" val={formik.values.name} onCh={formik.handleChange("name")} onBl={formik.handleBlur} />
                    {formik.errors.name && formik.touched.name && <div className='error'>{formik.errors.name}</div>}

                    <CustomInput type="datetime-local" label="Enter Expiry Date and Time" name="expiry" i_id="expiry" val={formik.values.expiry} onCh={formik.handleChange("expiry")} onBl={formik.handleBlur} />
                    {formik.errors.expiry && formik.touched.expiry && <div className='error'>{formik.errors.expiry}</div>}

                    <CustomInput type="number" label="Enter Discount (in %)" name="discount" i_id="discount" val={formik.values.discount.toString()} onCh={formik.handleChange("discount")} onBl={formik.handleBlur} />
                    {formik.errors.discount && formik.touched.discount && <div className='error'>{formik.errors.discount}</div>}


                    <button disabled={formik.isSubmitting || !formik.isValid} className='btn btn-success border-0 rounded-3 my-5' type="submit">Add Coupon</button>
                </form>
            </div>
        </div>
    )
}

export default AddCoupon;
