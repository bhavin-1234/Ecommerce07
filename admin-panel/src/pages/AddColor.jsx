import CustomInput from '../components/CustomInput';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { createColor, getColor, resetState, updateColor } from '../features/color/colorSlice';
import { useNavigate, useParams } from 'react-router-dom';


const AddColor = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const colorID = params.id;


    useEffect(() => {
        if (colorID) {
            dispatch(getColor(colorID));
        }
        else {
            dispatch(resetState());
        }
    }, [colorID, dispatch]);



    const newColor = useSelector(state => state.color);
    const { createdColor, isSuccess, isError, fetchedColor, updatedColor } = newColor;

    useEffect(() => {
        isSuccess && createdColor && toast.success("Color Created Successfully!", {
            onClose: () => formik.resetForm()
        });

        isSuccess && updatedColor && toast.success("Color Updated Successfully!", {
            onClose: () => {
                formik.resetForm();
                navigate("/admin/color-list");
            }
        });

        isError && toast.error("Something Went Wrong!");
    }, [isSuccess, isError, createdColor, updatedColor]);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Color Name is Required!")
    });

    const formik = useFormik({
        initialValues: {
            title: fetchedColor || ""
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            const data = { id: colorID, colorData: values };
            if (colorID) {
                dispatch(updateColor(data));
            } else {
                dispatch(createColor(values));
                setTimeout(() => {
                    dispatch(resetState());
                }, 3000);
            }
        }
    });

    return (
        <div>
            <h3 className="mb-4 title">{colorID ? "Edit" : "Add"} Color</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput type="color" label="Enter Color" name="title" i_id="title" val={formik.values.title} onCh={formik.handleChange("title")} onBl={formik.handleBlur} />
                    {formik.errors.title && formik.touched.title && <div className='error'>{formik.errors.title}</div>}
                    <button disabled={formik.isSubmitting || !formik.isValid} className='btn btn-success border-0 rounded-3 my-5' type="submit">{colorID ? "Edit" : "Add"} Color</button>
                </form>
            </div>
        </div>
    )
}

export default AddColor;
