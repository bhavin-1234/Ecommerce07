import CustomInput from '../components/CustomInput';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { createColor, resetState } from '../features/color/colorSlice';

const AddColor = () => {

    const dispatch = useDispatch();

    const initialValues = {
        title: ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Color Name is Required!")
    });


    const newColor = useSelector(state => state.color);
    const { createdColor, isSuccess, isError } = newColor;

    useEffect(() => {
        isSuccess && createdColor && toast.success("Color Created Successfully!", {
            onClose: () => formik.resetForm()
        });
        isError && toast.error("Something Went Wrong!");
    }, [isSuccess, isError, createdColor]);


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            dispatch(createColor(values));
            // formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
                // navigate("/admin/color-list");
            }, 3000);
        }
    });

    return (
        <div>
            <h3 className="mb-4 title">Add Color</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput type="color" label="Enter Color" name="title" i_id="title" val={formik.values.title} onCh={formik.handleChange("title")} onBl={formik.handleBlur} />
                    {formik.errors.title && formik.touched.title && <div className='error'>{formik.errors.title}</div>}
                    <button disabled={formik.isSubmitting || !formik.isValid} className='btn btn-success border-0 rounded-3 my-5' type="submit">Add Color</button>
                </form>
            </div>
        </div>
    )
}

export default AddColor;
