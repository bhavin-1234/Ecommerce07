import CustomInput from '../components/CustomInput';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createPCategory, resetState } from '../features/pCategory/pCategorySlice';


const AddCategory = () => {

    const dispatch = useDispatch();

    // const initialValues = {
    //     title: ""
    // };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Product Category is Required!")
    });




    const formik = useFormik({
        initialValues: {
            title: ""
        },
        validationSchema,
        onSubmit: values => {
            dispatch(createPCategory(values));
            // formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
                // navigate("/admin/category-list");
            }, 3000);
        }
    });



    const newPCategory = useSelector(state => state.pCategory);
    const { createdProductCategory, isSuccess, isError } = newPCategory;

    useEffect(() => {
        isSuccess && createdProductCategory && toast.success("Product Category Created Successfully!", {
            onClose: () => formik.resetForm()
        });

        isError && toast.error("Something Went Wrong!");
    }, [isSuccess, isError, createdProductCategory]);

    return (
        <div>
            <h3 className="mb-4 title">Add Category</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type="text" label="Enter Product Category" name="title" i_id="title" val={formik.values.title} onCh={formik.handleChange("title")} onBl={formik.handleBlur} />
                    {formik.errors.title && formik.touched.title && <div className='error'>{formik.errors.title}</div>}
                    <button disabled={formik.isSubmitting || !formik.isValid} className='btn btn-success border-0 rounded-3 my-5' type="submit">Add Product Category</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory;
