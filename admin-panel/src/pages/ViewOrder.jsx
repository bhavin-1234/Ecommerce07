import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// import { getOrderByUser, getOrders } from '../features/auth/authSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
// import moment from 'moment';

import { useParams } from "react-router-dom";
import { getOrder } from '../features/auth/authSlice';
// import { getOrder } from '../features/auth/authSlice';
// import { getOrderByUser } from '../features/auth/authSlice';




const ViewOrder = () => {

    const params = useParams();
    const orderId = params.id;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrder(orderId));
    }, [orderId]);

    const orderState = useSelector(state => state.auth?.singleOrder);

    console.log("orderState2:", orderState?.orderItems);


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
        }
    ];
    const data1 = [];



    for (let i = 0; i < orderState?.orderItems.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState?.orderItems[i]?.product?.title,
            brand: orderState?.orderItems[i]?.product?.brand,
            count: orderState?.orderItems[i]?.quantity,
            color: orderState?.orderItems[i]?.color?.title,
            amount: orderState?.orderItems[i]?.product?.price
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
