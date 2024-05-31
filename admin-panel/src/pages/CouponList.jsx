import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { deleteCoupon, getCoupons, resetState } from '../features/coupon/couponSlice';
import moment from 'moment';
import { Tooltip } from 'react-tooltip';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';




const CouponList = () => {

    const [open, setOpen] = useState(false);
    const [couponId, setCouponId] = useState("");

    const hideModal = () => {
        setOpen(false);
    }

    const showModal = (id) => {
        setOpen(true);
        setCouponId(id);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState());
        dispatch(getCoupons());
    }, []);

    const couponState = useSelector(state => state.coupon.coupons);

    const { isSuccess, isError, deletedCoupon } = useSelector(state => state.coupon);

    useEffect(() => {
        if (isSuccess && deletedCoupon) {
            toast.success("Coupon Deleted Successfully!", {
                onClose: () => {
                    dispatch(resetState());
                    dispatch(getCoupons());
                }
            });
        }

    }, [isSuccess, isError, deletedCoupon]);


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
            title: 'Discount(in %)',
            dataIndex: 'discount',
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiryDate',
        },
        {
            title: 'Expiry Time',
            dataIndex: 'expiryTime',
        },
        {
            title: 'Expiry Date and Time',
            dataIndex: 'expiryDateTime',
        },
        {
            title: 'Action',
            dataIndex: 'action',
        },
    ];
    const data1 = [];
    for (let i = 0; i < couponState.length; i++) {
        data1.push({
            key: i + 1,
            name: couponState[i].name,
            discount: couponState[i].discount,
            // expiry: couponState[i].expiry,
            expiryDate: moment(couponState[i].expiryDate).format("DD/MM/YYYY"),
            expiryTime: couponState[i].expiryTime,
            // expiryTime: moment(couponState[i].expiryTime).format("hh:mm:ss A"),
            expiryDateTime: moment(couponState[i].expiryDateTime).format("DD/MM/YYYY, hh:mm:ss A"),
            // expiry: new Date(couponState[i].expiry).toLocaleString(),
            action:
                <>
                    <Link
                        className="fs-3 text-danger"
                        to={`/admin/coupon/${couponState[i]._id}`}
                        data-tooltip-id="my-tooltip-1"
                        data-tooltip-content="Edit"
                        data-tooltip-place="bottom"
                        data-tooltip-class-name="rounded-5 px-3 py-0"
                        data-tooltip-variant="info"
                    >
                        <BiEdit />
                    </Link>
                    <Tooltip id="my-tooltip-1" />

                    <button
                        onClick={() => showModal(couponState[i]._id)}
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
        dispatch(deleteCoupon(couponId));
        hideModal();
    };


    return (
        <div>
            <h3 className="mb-4 title">Coupons</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <CustomModal title="Are you sure you want to delete this Coupon?" performAction={() => handleDelete()} open={open} hideModal={hideModal} />
            </div>
        </div>
    )
}

export default CouponList;
