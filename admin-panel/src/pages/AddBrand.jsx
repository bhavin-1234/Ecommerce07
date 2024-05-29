import CustomInput from '../components/CustomInput';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { createBrand, resetState } from '../features/brand/brandSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const AddBrand = () => {

    const dispatch = useDispatch();

    const initialValues = {
        title: ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Brand Name is Required!")
    });


    const newBrand = useSelector(state => state.brand);
    const { createdBrand, isSuccess, isError } = newBrand;

    useEffect(() => {
        isSuccess && createdBrand && toast.success("Brand Created Successfully!", {
            onClose: () => formik.resetForm()
        });
        isError && toast.error("Something Went Wrong!");
    }, [isSuccess, isError, createdBrand]);


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            dispatch(createBrand(values));
            // formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
                // navigate("/admin/brand-list");
            }, 3000);
        }
    });

    return (
        <div>
            <h3 className="mb-4 title">Add Brand</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput type="text" label="Enter Brand" name="title" i_id="title" val={formik.values.title} onCh={formik.handleChange("title")} onBl={formik.handleBlur} />
                    {formik.errors.title && formik.touched.title && <div className='error'>{formik.errors.title}</div>}
                    <button disabled={formik.isSubmitting || !formik.isValid} className='btn btn-success border-0 rounded-3 my-5' type="submit">Add Brand</button>
                </form>
            </div>
        </div>
    )
}

export default AddBrand;
