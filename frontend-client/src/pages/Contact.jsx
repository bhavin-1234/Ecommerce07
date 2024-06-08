import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import * as Yup from "yup";
import { useFormik } from "formik";
import { postEnquiry } from "../features/contact/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Contact = () => {


  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    comment: "",

  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    email: Yup.string().email("Invalid email format!").required("Email is required!"),
    mobile: Yup.string().required("Mobile is required!"),
    comment: Yup.string().required("Comment is required!"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(postEnquiry(values));
      setTimeout(() => {
        formik.resetForm();
      }, 2000);
    }
  });

  const { isSuccess, isError, contact } = useSelector(state => state.contact);

  useEffect(() => {
    if (isSuccess && contact) {
      toast.success("Enquiry Posted Succesfully!", {
        onClose: () => {
          formik.resetForm();
        }
      })
    }

    if (isError) {
      toast.success("Something Went Wrong!")

    }
  }, [isSuccess, isError, contact]);



  return (
    <>
      <Meta title="Contact Us" />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper py-4 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.4170944043!2d72.73989509547675!3d21.159340298935454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1716475262451!5m2!1sen!2sin" height="450" className="border-0 w-100" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between">
              <div>
                <h3 className="contact-title mb-4">Contact</h3>
                <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      onChange={formik.handleChange("name")}
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.name && formik.touched.name && <div className="error">{formik.errors.name}</div>}

                  </div>
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      onChange={formik.handleChange("email")}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && <div className="error">{formik.errors.email}</div>}

                  </div>
                  <div>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile Number"
                      name="mobile"
                      onChange={formik.handleChange("mobile")}
                      value={formik.values.mobile}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.mobile && formik.touched.mobile && <div className="error">{formik.errors.mobile}</div>}

                  </div>
                  <div>
                    <textarea
                      name="comment"
                      cols="30"
                      rows="5"
                      placeholder="Comments"
                      className="form-control w-100"
                      onChange={formik.handleChange("comment")}
                      value={formik.values.comment}
                      onBlur={formik.handleBlur}
                    >
                    </textarea>
                    {formik.errors.comment && formik.touched.comment && <div className="error">{formik.errors.comment}</div>}

                  </div>
                  <div>
                    <button
                      className="button border-0"
                      type="submit"
                      disabled={formik.isSubmitting || !formik.isValid}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4">Get In Touch With Us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex align-items-center gap-15">
                      <AiOutlineHome className="fs-5" />
                      <address className="mb-0">Hno: A-107, Near Yogichowk, Suart, Gujarat.</address>
                    </li>
                    <li className="mb-3 d-flex align-items-center gap-15">
                      <BiPhoneCall className="fs-5" />
                      <a href="tel:+91 8264954234">+91 8264954234</a>
                    </li>
                    <li className="mb-3 d-flex align-items-center gap-15">
                      <AiOutlineMail className="fs-5" />
                      <a href="mailto:navdeepdahiya753@gmail.com">bhavin@gmail.com</a>
                    </li>
                    <li className="mb-3 d-flex align-items-center gap-15">
                      <BiInfoCircle className="fs-5" />
                      <p className="mb-0">Monday - Friday 10 AM - 8 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
};

export default Contact;
