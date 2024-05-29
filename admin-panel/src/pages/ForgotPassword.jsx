import CustomInput from "../components/CustomInput";

const ForgotPassword = () => {
  return (
    <div style={{ background: "#ffd333" }} className="py-5 min-vh-100 d-flex align-items-center justify-content-center">
      <div className="my-5 w-25 p-4 bg-white rounded-3">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">Please enter your registered email to get reset password link in your email.</p>
        <form action="">
          <CustomInput type="text" i_id="email" label="Email Address" />
          <button className="border-0 px-3 py-2 text-white fw-bold w-100" style={{ background: "#ffd333" }} type="submit" >Send Link</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword;
