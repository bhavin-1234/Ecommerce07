import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// import { getOrderByUser, getOrders } from '../features/auth/authSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
// import moment from 'moment';

import { useParams } from "react-router-dom";
import { getOrderByUser } from '../features/auth/authSlice';




const ViewOrder = () => {

    const navigate = useParams();
    const userId = navigate.id;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderByUser(userId));
    }, []);

    const orderState = useSelector(state => state.auth?.orderbyuser?.products);

    console.log(orderState);


    // const orderState = useSelector(state => state.auth.orders);
    // console.log('orderState: ', orderState);


    const columns = [
        {
            title: 'SNo.',
            dataIndex: 'key',
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
        },
        {
            title: 'Count',
            dataIndex: 'count',
        },
        {
            title: 'Color',
            dataIndex: 'color',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
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
    for (let i = 0; i < orderState?.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState[i].product.title,
            brand: orderState[i].product.brand,
            count: orderState[i].count,
            color: orderState[i].color,
            amount: orderState[i].product.price,
            date: orderState[i].product.createdAt,
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
            <h3 className="mb-4 title">View Order</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default ViewOrder;
