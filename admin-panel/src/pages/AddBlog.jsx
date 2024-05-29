import { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { createBlog, resetState } from "../features/blogs/blogSlice";
import Dropzone from 'react-dropzone'
import { deleteImages, uploadImages } from "../features/image/imageSlice";
import { getBCategory } from "../features/bCategory/bCategorySlice";




const AddBlog = () => {

    const dispatch = useDispatch();

    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };


    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is Required!"),
        description: Yup.string().required("Description is Required!"),
        category: Yup.string().required("Category is Required!"),
        images: Yup.array().min(1, "Please select at least one image."),

    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            category: "",
            images: [],
        },
        validationSchema,
        onSubmit: values => {
            values.description = stripHtmlTags(values.description); // Strip HTML tags
            console.log("filadnfinal:", values)
            dispatch(createBlog(values));
            // formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
                // navigate("/admin/blog-list");
            }, 3000);
        },
    });

    useEffect(() => {
        dispatch(getBCategory())
    }, []);

    const handleDrop = async (acceptedFiles) => {
        const imageUploadResults = await dispatch(uploadImages(acceptedFiles));
        const imageData = await imageUploadResults?.payload?.map((image) => ({
            public_id: image.public_id,
            url: image.url
        }));
        formik.setFieldValue("images", imageData);
    };

    const newBlog = useSelector(state => state.blog);
    const { isError, isSuccess, createdBlog } = newBlog;


    useEffect(() => {

        isSuccess && createdBlog && toast.success("Blog Added Successfully!", {
            onClose: () => formik.resetForm()
        });

        isError && toast.error("Something went wrong!");

    }, [isSuccess, createdBlog, isError]);

    const blogCategoryState = useSelector(state => state.bCategory.blogCategories);

    console.log("blogCategoryState:", blogCategoryState);




    return (
        <div>
            <h3 className="mb-4 title">Add Blog</h3>
            <div>
                <form onSubmit={formik.handleSubmit}>

                    <div className="mt-4">
                        <CustomInput type="text" label="Enter Blog Title" name="title" i_id="title" val={formik.values.title} onCh={formik.handleChange("title")} onBl={formik.handleBlur} />
                        {formik.errors.title && formik.touched.title && <div className="error">{formik.errors.title}</div>}
                    </div>

                    <div className=" my-3">
                        <select name="category" className="form-select py-3" value={formik.values.category} onChange={formik.handleChange("category")} onBlur={formik.handleBlur}>
                            <option value="" disabled hidden>Select Blog Category</option>
                            {blogCategoryState.map(data => <option key={data._id} value={data.title}>{data.title}</option>)}
                        </select>
                        {formik.errors.category && formik.touched.category && <div className="error">{formik.errors.category}</div>}
                    </div>

                    <div onBlur={formik.handleBlur("description")}>
                        <ReactQuill theme="snow" name="description" value={formik.values.description} onChange={formik.handleChange("description")} />
                        {formik.errors.description && formik.touched.description && <div className="error">{formik.errors.description}</div>}
                    </div>

                    <div className="myDropZone" onBlur={formik.handleBlur("images")}>
                        <Dropzone onDrop={handleDrop} >
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag &#39;n&#39; drop product images here, or click to select images</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        {formik.errors.images && formik.touched.images && <div className="error">{formik.errors.images}</div>}
                    </div>
                    <div className="showImages d-flex gap-3 flex-wrap mt-3">
                        {formik?.values?.images?.map((image, index) => {
                            return <div key={index} className="position-relative">
                                <button type="button" className="btn-close position-absolute fs-6 end-0 m-2" style={{ cursor: "pointer" }} onClick={() => dispatch(deleteImages(image.public_url))}></button>
                                <img src={image.url} alt="image" style={{ width: "200px", height: "200px", borderRadius: "10px" }} />
                            </div>
                        })}
                    </div>

                    <button disabled={formik.isSubmitting || !formik.isValid} type="submit" className="btn btn-success border-0 rounded-3 my-5">Add to Blog</button>
                </form>
            </div>
        </div>
    )
}

export default AddBlog;
