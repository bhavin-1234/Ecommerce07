import { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getPCategory } from "../features/pCategory/pCategorySlice";
import { toast } from 'react-toastify';

// import Multiselect from "react-widgets/Multiselect";
// import "react-widgets/styles.css";
import { Select } from 'antd';
import { getColors } from "../features/color/colorSlice";
import Dropzone from 'react-dropzone';
import { deleteImages, uploadImages } from "../features/image/imageSlice";
import { createProduct, resetState } from "../features/product/productSlice";


const AddProduct = () => {


    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };


    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is Required!"),
        description: Yup.string().required("Description is Required!"),
        price: Yup.number().required("Price is Required!"),
        tag: Yup.string().required("Tag is Required!"),
        brand: Yup.string().required("Brand is Required!"),
        category: Yup.string().required("Category is Required!"),
        color: Yup.array().min(1, "Please select at least one color.").required("Color is Required!"),
        quantity: Yup.number().required("Quantity is Required!"),
        images: Yup.array().min(1, "Please select at least one image."),

    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: "",
            quantity: "",
            tag: "",
            brand: "",
            category: "",
            color: [],
            images: [],
        },
        validationSchema,
        onSubmit: values => {
            values.description = stripHtmlTags(values.description); // Strip HTML tags
            console.log(values);
            dispatch(createProduct(values));
            // formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
                // navigate("/admin/product-list");
            }, 3000);
        },
    });



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getPCategory());
        dispatch(getColors());


    }, []);

    const handleDrop = async (acceptedFiles) => {
        const imageUploadResults = await dispatch(uploadImages(acceptedFiles));
        const imageData = await imageUploadResults?.payload?.map((image) => ({
            public_id: image.public_id,
            url: image.url
        }));
        formik.setFieldValue("images", imageData);
    };


    const brandState = useSelector(state => state.brand.brands);
    const pCategoryState = useSelector(state => state.pCategory.productCategories);
    const colorState = useSelector(state => state.color.colors);


    const newProduct = useSelector(state => state.product);
    const { isError, isSuccess, createdProduct } = newProduct;


    useEffect(() => {

        isSuccess && createProduct && toast.success("Product Added Successfully!", {
            onClose: () => formik.resetForm()
        });

        isError && toast.error("Something went wrong!");

    }, [isSuccess, createdProduct, isError]);



    return (
        <div>
            <h3 className="mb-4 title">Add Product</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>

                    <CustomInput type="text" label="Enter Product Title" name="title" i_id="title" val={formik.values.title} onCh={formik.handleChange("title")} onBl={formik.handleBlur} />
                    {formik.errors.title && formik.touched.title && <div className="error">{formik.errors.title}</div>}

                    <div className="my-3" onBlur={formik.handleBlur("description")}>
                        <ReactQuill theme="snow" name="description" value={formik.values.description} onChange={formik.handleChange("description")} />
                        {formik.errors.description && formik.touched.description && <div className="error">{formik.errors.description}</div>}
                    </div>

                    <CustomInput type="number" label="Enter Product Price" name="price" i_id="price" val={formik.values.price.toString()} onCh={formik.handleChange("price")} onBl={formik.handleBlur} />
                    {formik.errors.price && formik.touched.price && <div className="error">{formik.errors.price}</div>}

                    <select name="brand" className="form-select py-3 mt-3" value={formik.values.brand} onChange={formik.handleChange("brand")} onBlur={formik.handleBlur}>
                        <option value="" disabled hidden>Select Brand</option>
                        {brandState.map(data => <option key={data._id} value={data.title}>{data.title}</option>)}
                    </select>
                    {formik.errors.brand && formik.touched.brand && <div className="error">{formik.errors.brand}</div>}

                    <select name="category" className="form-select py-3 mt-3" value={formik.values.category} onChange={formik.handleChange("category")} onBlur={formik.handleBlur}>
                        <option value="">Select Category</option>
                        {pCategoryState.map(data => <option key={data._id} value={data.title}>{data.title}</option>)}
                    </select>
                    {formik.errors.category && formik.touched.category && <div className="error">{formik.errors.category}</div>}

                    <select name="tag" className="form-select py-3 mt-3" value={formik.values.tag} onChange={formik.handleChange("tag")} onBlur={formik.handleBlur}>
                        <option value="" hidden disabled>Select Tag</option>
                        <option value="featured">Featured</option>
                        <option value="popular">Popular</option>
                        <option value="special">Special</option>
                    </select>
                    {formik.errors.tag && formik.touched.tag && <div className="error">{formik.errors.tag}</div>}

                    {/* <div onBlur={formik.handleBlur("color")}>
                        <Multiselect
                            name="color"
                            dataKey="id"
                            textField="color"
                            className="mt-3"
                            value={formik.values.color}
                            onChange={value => {
                                formik.setFieldValue("color", value)
                            }

                            }
                            placeholder="Select Color"
                            // data={[
                            //     { id: 1, color: "Red" },
                            //     { id: 2, color: "Yellow" },
                            //     { id: 3, color: "Blue" },
                            //     { id: 4, color: "Orange" },
                            // ]}
                            data={colorState.map(data => ({
                                _id: data._id,
                                color: data.title
                            }))}
                        />
                    </div> */}

                    <div onBlur={formik.handleBlur("color")}>
                        <Select mode="multiple" allowClear placeholder="Select Color" className="w-100 mt-3" value={formik.values.color} style={{ height: "60px" }}
                            options={colorState.map(color => ({
                                label: color.title,
                                value: color._id
                            }))}
                            onChange={(value) => formik.setFieldValue("color", value)}

                        />
                    </div>
                    {formik.errors.color && formik.touched.color && <div className="error">{formik.errors.color}</div>}

                    <CustomInput type="number" label="Enter Product Quantity" name="quantity" i_id="quantity" val={formik.values.quantity.toString()} onCh={formik.handleChange("quantity")} onBl={formik.handleBlur} />
                    {formik.errors.quantity && formik.touched.quantity && <div className="error">{formik.errors.quantity}</div>}

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

                    <button disabled={formik.isSubmitting || !formik.isValid} className='btn btn-success border-0 rounded-3 my-5 w-100' type="submit">Add Product</button>

                </form>
            </div>
        </div>
    )
}

export default AddProduct
