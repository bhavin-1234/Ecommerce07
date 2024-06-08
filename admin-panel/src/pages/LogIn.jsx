import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../features/auth/authSlice";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



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
      dispatch(loginAdmin(values));
    },
  });

  const { user, isError } = useSelector(state => state.auth);



  useEffect(() => {
    if (user && !isError) {
      setTimeout(() => {
        formik.resetForm();
        navigate("/admin");

      }, 2000);
    }
    // else {
    // navigate("/");
    // window.location.reload();
    // }
  }, [user, isError])

  return (
    <>

      <div style={{ background: "#ffd333" }} className="py-5 min-vh-100 d-flex align-items-center justify-content-center">
        <div className="my-5 w-25 p-4 bg-white rounded-3">
          <h3 className="text-center title">Log In</h3>
          <p className="text-center">Login to your account to continue.</p>
          <div className="error text-center">
            {/* {message === "Rejected" ? "You are not an admin" : ""} */}
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
            <button
              className="border-0 rounded-3 px-3 py-2 mt-3 text-white fw-bold w-100 text-center text-decoration-none fs-5" style={{ background: "#ffd333" }} type="submit" >Log In</button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </>
  )
}

export default LogIn;

// disabled = { formik.isSubmitting || !formik.isValid } 
