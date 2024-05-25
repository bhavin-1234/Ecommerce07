import CustomInput from "../components/CustomInput";

const ResetPassword = () => {
  return (
    <div style={{ background: "#ffd333" }} className="py-5 min-vh-100 d-flex align-items-center justify-content-center">
      <div className="my-5 w-25 p-4 bg-white rounded-3">
        <h3 className="text-center title">Reset Password</h3>
        <p className="text-center">Please enter your new password.</p>
        <form action="">
          <CustomInput type="password" i_id="new password" label="New Password" />
          <CustomInput type="password" i_id="confirm password" label="Confirm Password" />
          {/* <CustomInput type="password" i_id="Password" label="Password" /> */}
          <button className="border-0 px-3 py-2 text-white fw-bold w-100" style={{ background: "#ffd333" }} type="submit" >Reset Password</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword;
