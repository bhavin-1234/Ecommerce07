import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getEnquiry, resetState, updateEnquiry } from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";

const ViewEnquiry = () => {

    const params = useParams();
    const enquiryId = params.id;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getEnquiry(enquiryId));
    }, [enquiryId]);

    const { fetchedEnquiry, isSuccess, isError, updatedEnquiry } = useSelector(state => state.enquiry);

    const handleSelectChange = (value, id) => {
        const data = { id: id, status: value };
        dispatch(updateEnquiry(data));
    };


    useEffect(() => {

        if (isSuccess && updatedEnquiry) {
            toast.success("Enquiry Status Updated Successfully!", {
                onClose: () => {
                    dispatch(resetState());
                    dispatch(getEnquiry(enquiryId));
                }
            });
        }

        if (isError) {
            toast.error("Something Went Wrong!");
        }

    }, [isSuccess, isError, updatedEnquiry]);


    return (
        <>
            <div className="d-flex mb-4 justify-content-between">
                <h3 className="title mb-0">View Enquiry</h3>
                <button onClick={() => navigate(-1)} className="rounded-4 p-2 bg-transparent border-0 d-flex align-items-center gap-1 fs-6"><BiArrowBack className="fs-5" />Go Back</button>
            </div>
            <div className="mt-3 bg-white rounded-3 p-4 d-flex gap-3 flex-column">
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Name: </h6>
                    <p className="mb-0">{fetchedEnquiry?.name}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Mobile: </h6>
                    <p className="mb-0"><a href={`tel:${fetchedEnquiry?.mobile}`}>{fetchedEnquiry?.mobile}</a></p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Email: </h6>
                    <p className="mb-0"><a href={`mailto:${fetchedEnquiry?.email}`}>{fetchedEnquiry?.email}</a></p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Comment: </h6>
                    <p className="mb-0">{fetchedEnquiry?.comment}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Status: </h6>
                    <p className="mb-0">{fetchedEnquiry?.status}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Change Status: </h6>
                    <select name="" className="form-select" value={fetchedEnquiry?.status || "Submitted"}
                        onChange={(e) => handleSelectChange(e.target.value, enquiryId)}
                    >
                        <option value="Submitted">Submitted</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default ViewEnquiry;
