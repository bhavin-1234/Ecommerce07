import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from "../features/user/userSlice";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";

const Profile = () => {

    const dispatch = useDispatch();
    const userState = useSelector(state => state.auth.user);

    const [isDisabled, setIsDisabled] = useState(true);


    const initialValues = {
        firstname: userState?.firstname || "",
        lastname: userState?.lastname || "",
        email: userState?.email || "",
        mobile: userState?.mobile || "",
    };

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required("First Name is required!"),
        lastname: Yup.string().required("Last Name is required!"),
        email: Yup.string().required("Email is required!"),
        mobile: Yup.string().required("Mobile is required!"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(updateUser(values));
            setIsDisabled(true);
        }
    });


    return (
        <>
            <Meta title="My Profile" />
            <BreadCrumb title="My Profile" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mb-0">Update Profile</h3>
                            <FaEdit style={{ cursor: "pointer" }} className="fs-3" onClick={() => setIsDisabled(false)} />
                        </div>
                    </div>
                    <div className="col-12">
                        <form onSubmit={formik.handleSubmit}>
                            <fieldset disabled={isDisabled}>
                                <div className="mb-3">
                                    <label htmlFor="example1" className="form-label">First Name</label>
                                    <input type="text" name="firstname" value={formik.values.firstname} onChange={formik.handleChange("firstname")} onBlur={formik.handleBlur} className="form-control" id="example1" />
                                    {formik.errors.firstname && formik.touched.firstname && <div className="error">{formik.errors.firstname}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="example2" className="form-label">Last Name</label>
                                    <input type="text" name="lastname" value={formik.values.lastname} onChange={formik.handleChange("lastname")} onBlur={formik.handleBlur} className="form-control" id="example2" />
                                    {formik.errors.lastname && formik.touched.lastname && <div className="error">{formik.errors.lastname}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="example3" className="form-label">Email address</label>
                                    <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur} className="form-control" id="example3" />
                                    {formik.errors.email && formik.touched.email && <div className="error">{formik.errors.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="example4" className="form-label">Mobile Number</label>
                                    <input type="text" name="mobile" value={formik.values.mobile} onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur} className="form-control" id="example4" />
                                    {formik.errors.mobile && formik.touched.mobile && <div className="error">{formik.errors.mobile}</div>}
                                </div>
                                {!isDisabled &&
                                    <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting || !formik.isValid}>Save</button>
                                }
                            </fieldset>
                        </form>
                    </div>
                </div>
            </Container>

        </>
    )
}

export default Profile;
