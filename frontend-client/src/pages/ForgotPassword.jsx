import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPasswordToken } from "../features/user/userSlice";



const ForgotPassword = () => {
    const dispatch = useDispatch();

    const initialValues = {
        email: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email format!").required("Email is required!"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            dispatch(forgotPasswordToken(values));
            // formik.resetForm();
            // navigate("/");
        }
    });


    return (
        <>
            <Meta title="Forgot Password" />
            <BreadCrumb title="Forgot Password" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Reset Your Password</h3>
                            <p className="text-center mt-2 mb-3">We will send you an email to reset your password</p>
                            <form className="d-flex flex-column gap-15" onSubmit={formik.handleSubmit}>
                                <CustomInput
                                    type="email"
                                    name="email"
                                    label="Email"
                                    val={formik.values.email}
                                    onCh={formik.handleChange("email")}
                                    onBl={formik.handleBlur}
                                    i_id="email"
                                />
                                {formik.errors.email && formik.touched.email && <div className="error">{formik.errors.email}</div>}
                                <div>
                                    <div className="mt-3 d-flex flex-column justify-content-center align-items-center gap-15">
                                        <button className="button border-0" type="submit">Submit</button>
                                        <Link to="/login">Cancel</Link>
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

export default ForgotPassword;
