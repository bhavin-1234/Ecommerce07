import CustomInput from '../components/CustomInput';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { createBrand, getABrand, resetState, updateBrand } from '../features/brand/brandSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddBrand = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const params = useParams();
    const brandId = params.id;

    const newBrand = useSelector(state => state.brand);
    const { createdBrand, isSuccess, isError, fetchedBrand, updatedBrand } = newBrand;


    const initialValues = {
        title: fetchedBrand || ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Brand Name is Required!")
    });


    useEffect(() => {
        if (brandId) {
            dispatch(getABrand(brandId));
        }
        else {
            dispatch(resetState());
        }
    }, [brandId]);

    useEffect(() => {
        isSuccess && createdBrand && toast.success("Brand Name Created Successfully!", {
            onClose: () => formik.resetForm()
        });

        if (isSuccess && updatedBrand) {
            toast.success("Brand Name Updated Successfully!", {
                onClose: () => {
                    formik.resetForm()
                    navigate("/admin/brand-list");
                }
            });
        }

        isError && toast.error("Something Went Wrong!");
    }, [isSuccess, isError, createdBrand, updatedBrand]);







    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (brandId) {
                const data = { id: brandId, brandData: values }
                dispatch(updateBrand(data));
            } else {
                dispatch(createBrand(values));
                setTimeout(() => {
                    dispatch(resetState());
                }, 3000);
            }
        }
    });

    return (
        <div>
            <h3 className="mb-4 title">{brandId ? "Edit" : "Add"} Brand</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput type="text" label="Enter Brand" name="title" i_id="title" val={formik.values.title} onCh={formik.handleChange("title")} onBl={formik.handleBlur} />
                    {formik.errors.title && formik.touched.title && <div className='error'>{formik.errors.title}</div>}
                    <button disabled={formik.isSubmitting || !formik.isValid} className='btn btn-success border-0 rounded-3 my-5' type="submit">{brandId ? "Edit" : "Add"} Brand</button>
                </form>
            </div>
        </div>
    )
}

export default AddBrand;
