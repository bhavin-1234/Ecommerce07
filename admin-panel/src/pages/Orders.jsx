import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/auth/authSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import moment from 'moment';



const Orders = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders())
    }, []);

    const orderState = useSelector(state => state.auth.orders);
    console.log('orderState: ', orderState);


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
    for (let i = 0; i < orderState.length; i++) {
        data1.push({
            key: i + 1,
            name: `${orderState[i].orderBy.firstname.padEnd(30)}${orderState[i].orderBy.lastname
                }`,
            products:
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    {(orderState[i].products.map((data, index, array) => <li key={data.product._id}>{data.product.title}{index !== array.length - 1 && ","}</li>))}
                </ul>,
            amount: orderState[i].paymentIntent.amount,
            date: moment(orderState[i].createdAt).format("DD/MM/YYYY, hh:mm:ss A"),
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
            <h3 className="mb-4 title">Orders</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Orders;
