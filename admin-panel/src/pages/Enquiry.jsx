import { Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { getEnquiries } from '../features/enquiry/enquirySlice';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import moment from 'moment';


const Enquiry = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEnquiries())
    }, []);

    const enquiryState = useSelector(state => state.enquiry.enquiries);

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
    const data1 = [];
    for (let i = 0; i < enquiryState.length; i++) {
        data1.push({
            key: i + 1,
            name: enquiryState[i].name,
            email: enquiryState[i].email,
            mobile: enquiryState[i].mobile,
            comment: enquiryState[i].comment,
            status:
                <select name="" id="" className='form-select'>
                    <option value="" disabled hidden>Set Status</option>
                </select>,
            date: moment(enquiryState[i].createdAt).format('MM/DD/YYYY, hh:mm:ss A'),
            action:
                <Link className="ms-3 fs-3 text-danger" to="/">
                    <AiFillDelete />
                </Link>
        });
    }

    return (
        <div>
            <h3 className="mb-4 title">Enquiries</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Enquiry;
