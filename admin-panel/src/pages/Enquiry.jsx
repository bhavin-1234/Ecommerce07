import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEnquiry, getEnquiries, resetState, updateEnquiry } from '../features/enquiry/enquirySlice';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import moment from 'moment';
import { AiOutlineEye } from "react-icons/ai";
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';


const Enquiry = () => {


    const [open, setOpen] = useState(false);
    const [enquiryId, setEnquiryId] = useState("");

    const hideModal = () => {
        setOpen(false);
    }

    const showModal = (id) => {
        setOpen(true);
        setEnquiryId(id);
    }


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEnquiries())
    }, []);

    const enquiryState = useSelector(state => state.enquiry.enquiries);

    const { isSuccess, isError, deletedEnquiry, updatedEnquiry } = useSelector(state => state.enquiry);


    useEffect(() => {
        if (isSuccess && deletedEnquiry) {
            toast.success("Enquiry Deleted Successfully!", {
                onClose: () => {
                    dispatch(resetState());
                    dispatch(getEnquiries());
                }
            });
        }

        if (isSuccess && updatedEnquiry) {
            toast.success("Enquiry Status Updated Successfully!", {
                onClose: () => {
                    dispatch(resetState());
                    dispatch(getEnquiries());
                }
            });
        }

        if (isError) {
            toast.error("Something Went Wrong!");
        }

    }, [isSuccess, isError, deletedEnquiry, updatedEnquiry]);

    const columns = [
        {
            title: 'SNo.',
            dataIndex: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Action',
            dataIndex: 'action',
        },
    ];


    const handleSelectChange = (value, id) => {
        const data = { id: id, status: value };
        dispatch(updateEnquiry(data));
    };


    const data1 = [];
    for (let i = 0; i < enquiryState.length; i++) {
        data1.push({
            key: i + 1,
            name: enquiryState[i].name,
            email: enquiryState[i].email,
            mobile: enquiryState[i].mobile,
            comment: enquiryState[i].comment,
            status:
                <select name="" className="form-select" value={enquiryState[i]?.status || "Submitted"} onChange={(e) => handleSelectChange(e.target.value, enquiryState[i]._id)}>
                    <option value="Contacted">Contacted</option>
                    <option value="Submitted">Submitted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>,
            date: moment(enquiryState[i].createdAt).format('MM/DD/YYYY, hh:mm:ss A'),
            action:
                <>
                    <Link
                        className="ms-3 fs-3 text-danger" to={`/admin/enquiries/${enquiryState[i]._id}`}
                        data-tooltip-id="my-tooltip-1"
                        data-tooltip-content="View"
                        data-tooltip-place="bottom"
                        data-tooltip-class-name="rounded-5 px-3 py-0"
                        data-tooltip-variant="info"
                    >
                        <AiOutlineEye />
                    </Link>
                    <Tooltip id="my-tooltip-1" />
                    <button
                        onClick={() => showModal(enquiryState[i]._id)}
                        type="submit"
                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                        data-tooltip-id="my-tooltip-2"
                        data-tooltip-content="Delete"
                        data-tooltip-place="bottom"
                        data-tooltip-class-name="rounded-5 px-3 py-0"
                        data-tooltip-variant="error"
                    >
                        <AiFillDelete />
                    </button>
                    <Tooltip id="my-tooltip-2" />
                </>
        });
    }


    const handleDelete = () => {
        dispatch(deleteEnquiry(enquiryId));
        hideModal();
    };


    return (
        <div>
            <h3 className="mb-4 title">Enquiries</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <CustomModal title="Are you sure you want to delete this Enquiry?" performAction={() => handleDelete()} open={open} hideModal={hideModal} />
            </div>
        </div>
    )
}

export default Enquiry;
