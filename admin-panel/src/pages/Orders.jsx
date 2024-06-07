import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrderStatus } from '../features/auth/authSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import moment from 'moment';
import { useState } from 'react';



const Orders = () => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getOrders());
    }, []);

    const orderState = useSelector(state => state.auth.orders);
    console.log('orderState1: ', orderState);


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
            title: 'Products',
            dataIndex: 'products',
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
            name: `${orderState[i]?.user?.firstname} ${orderState[i]?.user?.lastname
                }`,
            products:
                <>

                    <Link
                        to={`/admin/orders/${orderState[i]?._id}`}>
                        View Orders
                    </Link>
                </>,
            amount: orderState[i]?.totalPrice,
            date: moment(orderState[i].createdAt).format("DD/MM/YYYY, hh:mm:ss A"),
            action:
                <>
                    <select value={orderState[i]?.orderStatus} onChange={(e) => handleStatusChange(e, orderState[i]?._id)} className='form-select'>
                        <option value="Processed">Processed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out of Delivery">Out of Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Ordered">Ordered</option>
                    </select>
                </>
        });
    }

    const handleStatusChange = (e, id) => {
        const data = { id: id, status: e.target.value }
        dispatch(updateOrderStatus(data));
        setTimeout(() => {
            dispatch(getOrders());
        }, 50);
    };

    // <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
    //     {(orderState[i].products.map((data, index, array) => <li key={data.product?._id}>{data.product?.title}{index !== array.length - 1 && ","}</li>))}
    // </ul>,


    return (
        <div>
            <h3 className="mb-4 title">Orders</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Orders;
