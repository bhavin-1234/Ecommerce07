import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { registerUser } from '../features/user/userSlice';


const SignUp = () => {

    const dispatch = useDispatch();

    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required("First Name is required!"),
        lastname: Yup.string().required("Last Name is required!"),
        email: Yup.string().email("Invalid email format!").required("Email is required!"),
        mobile: Yup.string().required("Mobile Number is required!"),
        password: Yup.string().required("Pasword is required!"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            dispatch(registerUser(values));
            setTimeout(() => {
                formik.resetForm();
            }, 2000);
        }
    });




    return (
        <>
            <Meta title="Sign Up" />
            <BreadCrumb title="Sign Up" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Sign Up</h3>
                            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                                <div>
                                    <CustomInput name="firstname" i_id="firstname"
                                        val={formik.values.firstname}
                                        onCh={formik.handleChange("firstname")}
                                        onBl={formik.handleBlur} type="text"
                                        label="First Name"
                                    />
                                    {formik.errors.firstname && formik.touched.firstname && <div className="error">{formik.errors.firstname}</div>}
                                </div>
                                <div>
                                    <CustomInput name="lastname" i_id="lastname" val={formik.values.lastname} onCh={formik.handleChange("lastname")} onBl={formik.handleBlur} type="text" label="Last Name" />
                                    {formik.errors.lastname && formik.touched.lastname && <div className="error">{formik.errors.lastname}</div>}
                                </div>
                                <div>
                                    <CustomInput name="email" i_id="email" val={formik.values.email} onCh={formik.handleChange("email")} onBl={formik.handleBlur} type="email" label="Email" />
                                    {formik.errors.email && formik.touched.email && <div className="error">{formik.errors.email}</div>}
                                </div>
                                <div>
                                    <CustomInput name="mobile" i_id="mobile" val={formik.values.mobile} onCh={formik.handleChange("mobile")} onBl={formik.handleBlur} type="tel" label="Mobile Number" />
                                    {formik.errors.mobile && formik.touched.mobile && <div className="error">{formik.errors.mobile}</div>}
                                </div>
                                <div>
                                    <CustomInput name="password" i_id="pasword" val={formik.values.password} onCh={formik.handleChange("password")} onBl={formik.handleBlur} type="password" label="Password" />
                                    {formik.errors.password && formik.touched.password && <div className="error">{formik.errors.password}</div>}
                                </div>
                                <div>
                                    <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                                        <button
                                            disabled={formik.isSubmitting || !formik.isValid} className="button border-0" type="submit">Sign Up</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default SignUp;
