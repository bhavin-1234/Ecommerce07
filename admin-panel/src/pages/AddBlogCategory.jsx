import CustomInput from '../components/CustomInput';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { createBCategory, resetState } from '../features/bCategory/bCategorySlice';

const AddBlogCategory = () => {


  const dispatch = useDispatch();

  const initialValues = {
    title: ""
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Blog Category Name is Required!")
  });


  const newBCategory = useSelector(state => state.bCategory);
  const { createdBlogCategory, isSuccess, isError } = newBCategory;

  useEffect(() => {
    isSuccess && createdBlogCategory && toast.success("Blog Category Created Successfully!", {
      onClose: () => formik.resetForm()
    });
    isError && toast.error("Something Went Wrong!");
  }, [isSuccess, isError, createdBlogCategory]);


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(createBCategory(values));
      // formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        // navigate("/admin/blog-category-list");
      }, 2000);
    }
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput type="text" label="Enter Blog Category" name="title" i_id="title" val={formik.values.title} onCh={formik.handleChange("title")} onBl={formik.handleBlur} />
          {formik.errors.title && formik.touched.title && <div className='error'>{formik.errors.title}</div>}
          <button disabled={formik.isSubmitting || !formik.isValid} className='btn btn-success border-0 rounded-3 my-5' type="submit">Add Blog Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddBlogCategory;
