import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useParams } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassWord } from "../features/user/userSlice";



const ResetPassword = () => {
    const params = useParams();

    const token = params.token;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        password: "",
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string().required("Pasword is required!"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            const data = { token: token, password: values?.password }
            dispatch(resetPassWord(data));
            formik.resetForm();
            navigate("/login");
        }
    });

    return (
        <>
            <Meta title="Reset Password" />
            <BreadCrumb title="Reset Password" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Reset Password</h3>
                            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                                <CustomInput type="password" name="password" label="Password" i_id="password"
                                    val={formik.values.password}
                                    onCh={formik.handleChange("password")}
                                    onBl={formik.handleBlur} />
                                {formik.errors.password && formik.touched.password && <div className="error">{formik.errors.password}</div>}
                                <div>
                                    <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                                        <button className="button border-0">Ok</button>
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

export default ResetPassword;
