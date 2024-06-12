import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { useEffect } from "react";
import { useState } from "react";


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email format!").required("Email is required!"),
        password: Yup.string().required("Pasword is required!"),
    });

    const authState = useSelector(state => state.auth);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            await dispatch(loginUser(values));
            // formik.resetForm();
            // navigate("/");

            setTimeout(() => {
                formik.setSubmitting(false);
                setIsLoading(false);
            }, 2000);
        }
    });

    useEffect(() => {
        if (authState.user && !authState.isError) {
            setTimeout(() => {

                navigate("/");
                formik.resetForm();
            }, 2000);
        }
    }, [authState]);






    return (
        <>
            <Meta title="Log In" />
            <BreadCrumb title="Log In" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Login</h3>
                            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                                <div>
                                    <CustomInput
                                        type="email"
                                        name="email"
                                        i_id="email"
                                        val={formik.values.email}
                                        onCh={formik.handleChange("email")}
                                        onBl={formik.handleBlur}
                                        label="Email"
                                    />
                                    {formik.errors.email && formik.touched.email && <div className="error">{formik.errors.email}</div>}
                                </div>
                                <div>
                                    <CustomInput
                                        type="password" name="password"
                                        i_id="password"
                                        val={formik.values.password}
                                        onCh={formik.handleChange("password")}
                                        onBl={formik.handleBlur} label="Password"
                                    />
                                    {formik.errors.password && formik.touched.password && <div className="error">{formik.errors.password}</div>}
                                </div>
                                <div>
                                    <Link to="/forgot-password">Forgot Password?</Link>
                                    <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                                        <button className="button border-0"
                                            type="submit"
                                            // disabled={formik.isSubmitting || !formik.isValid}
                                            disabled={formik.isSubmitting}
                                        >
                                            {/* Log In */}
                                            {isLoading ? "Logging In..." : "Log In"}
                                        </button>
                                        <Link to="/signup" className="button signup">Sign Up</Link>
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

export default Login;
