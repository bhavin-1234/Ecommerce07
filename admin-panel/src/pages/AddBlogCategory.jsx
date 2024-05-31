import CustomInput from '../components/CustomInput';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { createBCategory, getBCategory, resetState, updateBCategory } from '../features/bCategory/bCategorySlice';
import { useNavigate, useParams } from 'react-router-dom';

const AddBlogCategory = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const bCategoryID = params.id;

  useEffect(() => {
    if (bCategoryID) {
      dispatch(getBCategory(bCategoryID));
    }
    else {
      dispatch(resetState());
    }
  }, [bCategoryID, dispatch]);




  const newBCategory = useSelector(state => state.bCategory);
  const { createdBlogCategory, isSuccess, isError, fetchedBCategory, updatedBCategory } = newBCategory;



  useEffect(() => {
    isSuccess && createdBlogCategory && toast.success("Blog Category Created Successfully!", {
      onClose: () => formik.resetForm()
    });

    isSuccess && updatedBCategory && toast.success("Blog Category Updated Successfully!", {
      onClose: () => {
        formik.resetForm();
        navigate("/admin/blog-category-list");
      }
    });

    isError && toast.error("Something Went Wrong!");
  }, [isSuccess, isError, createdBlogCategory, updatedBCategory]);


  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Blog Category Name is Required!")
  });


  const formik = useFormik({
    initialValues: {
      title: fetchedBCategory || ""
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const data = { id: bCategoryID, bCategoryData: values };
      if (bCategoryID) {
        dispatch(updateBCategory(data));

      } else {
        dispatch(createBCategory(values));
        setTimeout(() => {
          dispatch(resetState());
        }, 2000);
      }
    }
  });

  return (
    <div>
      <h3 className="mb-4 title">{bCategoryID ? "Edit" :
        "Add"} Blog Category</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput type="text" label="Enter Blog Category" name="title" i_id="title" val={formik.values.title} onCh={formik.handleChange("title")} onBl={formik.handleBlur} />
          {formik.errors.title && formik.touched.title && <div className='error'>{formik.errors.title}</div>}
          <button disabled={formik.isSubmitting || !formik.isValid} className='btn btn-success border-0 rounded-3 my-5' type="submit">{bCategoryID ? "Edit" :
            "Add"} Blog Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddBlogCategory;
