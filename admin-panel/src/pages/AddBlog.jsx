import { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { createBlog, getBlog, resetState, updateBlog } from "../features/blogs/blogSlice";
import Dropzone from 'react-dropzone'
import { deleteImages, uploadImagesBlogs } from "../features/image/imageSlice";
import { getBCategories } from "../features/bCategory/bCategorySlice";
import { useNavigate, useParams } from 'react-router-dom';





const AddBlog = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const blogID = params.id;


    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    useEffect(() => {
        if (blogID) {
            dispatch(getBlog(blogID));
        }
        else {
            dispatch(resetState());
        }
    }, [blogID, dispatch]);


    const newBlog = useSelector(state => state.blog);
    const { isError, isSuccess, createdBlog, updatedBlog, fetchedBlogTitle, fetchedBlogDescription, fetchedBlogCategory, fetchedBlogImages } = newBlog;


    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is Required!"),
        description: Yup.string().required("Description is Required!"),
        category: Yup.string().required("Category is Required!"),
        images: Yup.array().min(1, "Please select at least one image."),

    });

    const formik = useFormik({
        initialValues: {
            title: fetchedBlogTitle || '',
            description: fetchedBlogDescription || '',
            category: fetchedBlogCategory || '',
            images: fetchedBlogImages || [],
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            values.description = stripHtmlTags(values.description); // Strip HTML tags
            const data = { id: blogID, blogData: values };
            if (blogID) {
                dispatch(updateBlog(data));
            } else {
                dispatch(createBlog(values));
                setTimeout(() => {
                    dispatch(resetState());
                }, 3000);
            }
        },
    });

    useEffect(() => {
        dispatch(getBCategories());
    }, []);

    const handleDrop = async (acceptedFiles) => {
        const folder = "blogs";
        const formData = new FormData();
        acceptedFiles.map(file => formData.append("blog-images", file));
        formData.append("folder", folder);
        console.log(formData);
        const imageUploadResults = await dispatch(uploadImagesBlogs(formData));
        const imageData = await imageUploadResults?.payload?.map((image) => ({
            public_id: image.public_id,
            url: image.url
        }));
        formik.setFieldValue("images", [...formik.values.images, ...imageData]);


        // const imageData = await imageUploadResults?.payload?.map((image) => ({
        //     public_id: image.public_id,
        //     url: image.url
        // }));
        // formik.setFieldValue("images", imageData);
        // formik.setFieldValue("images", imageData);
        // formik.values.images.push(imageData);
    };

    // const handleDrop = async (acceptedFiles) => {
    //     const imageUploadResults = await dispatch(uploadImages(acceptedFiles));
    //     console.log('imageUploadResults: ', imageUploadResults);

    //     const imageData = await imageUploadResults?.payload?.map((image) => ({
    //         public_id: image.public_id,
    //         url: image.url
    //     }));
    //     formik.setFieldValue("images", imageData);
    // };


    useEffect(() => {

        isSuccess && createdBlog && toast.success("Blog Added Successfully!", {
            onClose: () => formik.resetForm()
        });

        isSuccess && updatedBlog && toast.success("Blog Updated Successfully!", {
            onClose: () => {
                formik.resetForm();
                navigate("/admin/blog-list");
            }
        });


        isError && toast.error("Something went wrong!");

    }, [isSuccess, createdBlog, isError, updatedBlog]);

    const blogCategoryState = useSelector(state => state.bCategory.blogCategories);


    const handleDeleteImage = async (imageId) => {
        await dispatch(deleteImages(imageId));
        formik.setFieldValue("images", formik.values.images.filter(image => image.public_id !== imageId))
    };


    return (
        <div>
            <h3 className="mb-4 title">{blogID ? "Edit" : "Add"} Blog</h3>
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
                        {formik?.values?.images?.map((image, index) => (
                            <div key={index} className="position-relative">
                                <button type="button" className="btn-close position-absolute fs-6 end-0 m-2" style={{ cursor: "pointer" }} onClick={() => handleDeleteImage(image.public_url)}></button>
                                <img src={image?.url} alt="image" style={{ width: "200px", height: "200px", borderRadius: "10px" }} />
                            </div>
                        ))}
                    </div>

                    <button disabled={formik.isSubmitting || !formik.isValid} type="submit" className="btn btn-success border-0 rounded-3 my-5">{blogID ? "Edit" : "Add"} to Blog</button>
                </form>
            </div>
        </div>
    )
}

export default AddBlog;
