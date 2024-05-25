import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";

const LogIn = () => {
  return (
    <div style={{ background: "#ffd333" }} className="py-5 min-vh-100 d-flex align-items-center justify-content-center">
      <div className="my-5 w-25 p-4 bg-white rounded-3">
        <h3 className="text-center title">Log In</h3>
        <p className="text-center">Login to your account to continue.</p>
        <form action="">
          <CustomInput type="text" i_id="email" label="Email Address" />
          <CustomInput type="password" i_id="Password" label="Password" />
          <div className="mb-3 text-end">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <Link to="/admin" className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5" style={{ background: "#ffd333" }} type="submit" >Log In</Link>
        </form>
      </div>
    </div>
  )
}

export default LogIn;
