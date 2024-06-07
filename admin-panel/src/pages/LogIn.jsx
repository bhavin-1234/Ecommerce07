import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useEffect } from "react";


const LogIn = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is Required!").email("Email Shuold be valid"),
    password: Yup.string().required("Password is Required!"),

  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(login(values));
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { user, isError, isSuccess, message, isLoading } = useSelector(state => state.auth);




  useEffect(() => {
    if (isSuccess) {
      navigate("/admin");

    }
    if (isError) {
      alert("Invalid credentials. Please try again.");
    }
    // else {
    // navigate("/");
    // window.location.reload();
    // }
  }, [isSuccess, isError, navigate])

  return (
    <div style={{ background: "#ffd333" }} className="py-5 min-vh-100 d-flex align-items-center justify-content-center">
      <div className="my-5 w-25 p-4 bg-white rounded-3">
        <h3 className="text-center title">Log In</h3>
        <p className="text-center">Login to your account to continue.</p>
        <div className="error text-center">
          {message.message === "Rejected" ? "You are not an admin" : ""}
        </div>
        {/* {isError && <div className="error text-center">{message}</div>} */}
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            i_id="email"
            label="Email Address"
            onCh={formik.handleChange("email")}
            onBl={formik.handleBlur}
            val={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && <div className="error">{formik.errors.email}</div>}
          <CustomInput
            type="password"
            name="password"
            i_id="Password"
            label="Password"
            onCh={formik.handleChange("password")}
            onBl={formik.handleBlur}
            val={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && <div className="error">{formik.errors.password}</div>}
          {/* <div className="mb-3 text-end">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div> */}
          <button disabled={formik.isSubmitting || !formik.isValid} className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5" style={{ background: "#ffd333" }} type="submit" >Log In</button>
        </form>
      </div>
    </div>
  )
}

export default LogIn;
