import { Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { getCoupons } from '../features/coupon/couponSlice';
import moment from 'moment';




const BrandList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCoupons())
    }, []);

    const couponState = useSelector(state => state.coupon.coupons);

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
            title: 'Expiry',
            dataIndex: 'expiry',
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
            expiry: moment(couponState[i].expiry).format("DD/MM/YYYY, hh:mm:ss A"),
            // expiry: new Date(couponState[i].expiry).toLocaleString(),
            action:
                <>
                    <Link className="fs-3 text-danger" to="/">
                        <BiEdit />
                    </Link>
                    <Link className="ms-3 fs-3 text-danger" to="/">
                        <AiFillDelete />
                    </Link>
                </>
        });
    }


    return (
        <div>
            <h3 className="mb-4 title">Coupons</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default BrandList;
