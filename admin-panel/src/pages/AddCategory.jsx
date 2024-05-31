import CustomInput from '../components/CustomInput';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createPCategory, getPCategory, resetState, updatePCategory } from '../features/pCategory/pCategorySlice';
import { useNavigate, useParams } from 'react-router-dom';


const AddCategory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const pCategoryID = params.id;


    useEffect(() => {
        if (pCategoryID) {
            dispatch(getPCategory(pCategoryID));
        }
        else {
            dispatch(resetState());
        }
    }, [pCategoryID, dispatch]);



    const newPCategory = useSelector(state => state.pCategory);
    const { createdProductCategory, isSuccess, isError, fetchedPCategory, updatedPCategory } = newPCategory;


    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Product Category is Required!")
    });


    const formik = useFormik({
        initialValues: {
            title: fetchedPCategory || ""
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            const data = { id: pCategoryID, pCategoryData: values }
            if (pCategoryID) {
                dispatch(updatePCategory(data));
            } else {
                dispatch(createPCategory(values));
                setTimeout(() => {
                    dispatch(resetState());
                }, 3000);
            }
        }
    });




    useEffect(() => {
        isSuccess && createdProductCategory && toast.success("Product Category Created Successfully!", {
            onClose: () => formik.resetForm()
        });

        isSuccess && updatedPCategory && toast.success("Product Category Updated Successfully!", {
            onClose: () => {
                formik.resetForm();
                navigate("/admin/category-list");
            }
        });

        isError && toast.error("Something Went Wrong!");
    }, [isSuccess, isError, createdProductCategory, updatedPCategory]);

    return (
        <div>
            <h3 className="mb-4 title">{pCategoryID ? "Edit" : "Add"} Category</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput type="text" label="Enter Product Category" name="title" i_id="title" val={formik.values.title} onCh={formik.handleChange("title")} onBl={formik.handleBlur} />
                    {formik.errors.title && formik.touched.title && <div className='error'>{formik.errors.title}</div>}
                    <button disabled={formik.isSubmitting || !formik.isValid} className='btn btn-success border-0 rounded-3 my-5' type="submit">{pCategoryID ? "Edit" : "Add"} Product Category</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory;
