// import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
// import { BsArrowDownRight } from "react-icons/bs";
// import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { getMonthlyOrderData, getOrders, getYearlyOrderData } from "../features/auth/authSlice";
import { useState } from "react";

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
        title: 'Product Count',
        dataIndex: 'product',
    },
    {
        title: 'Total Price',
        dataIndex: 'price',
    },
    {
        title: 'Total Price After Dicount',
        dataIndex: 'dprice',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];





const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMonthlyOrderData());
        dispatch(getYearlyOrderData());
        dispatch(getOrders());
    }, [dispatch]);
    // const { monthlyData }  = useSelector(state => state.auth);
    const { yearlyData = [], orders = [] } = useSelector(state => state.auth);
    // const [monthWiseIncome, setMonthWiseIncome] = useState(null);
    // const [monthWiseOrders, setMonthWiseOrders] = useState(null);
    const [ordersData, setOrdersData] = useState(null);



    useEffect(() => {
        // let monthlyIncome = [];
        // let monthlyOrders = [];

        // const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // for (let index = 0; index < monthlyData?.length; index++) {
        //     const element = monthlyData[index];
        //     monthlyIncome.push({
        //         type: monthNames[element?._id?.month],
        //         income: element?.amount
        //     });
        //     monthlyOrders.push({
        //         type: monthNames[element?._id?.month],
        //         sales: element?.count
        //     });
        // }
        // setMonthWiseIncome(monthlyIncome);
        // setMonthWiseOrders(monthlyOrders);


        let data1 = [];
        for (let i = 0; i < orders?.length; i++) {
            data1.push({
                key: i + 1,
                name: `${orders[i]?.user?.firstname} ${orders[i]?.user?.lastname}`,
                product: orders[i]?.orderItems?.length,
                price: orders[i]?.totalPrice,
                dprice: orders[i]?.totalPriceAfterDiscount,
                status: orders[i]?.orderStatus,
            });
        }
        setOrdersData(data1)

    }, [orders]);
    // }, [monthlyData]);


    // console.log("monthWiseIncome: ", monthWiseIncome);
    // console.log("monthWiseOrders: ", monthWiseOrders);


    // const data = [
    //     { type: 'Jan', value: 0.16 },
    //     { type: 'Feb', value: 0.125 },
    //     { type: 'March', value: 0.24 },
    //     { type: 'April', value: 0.24 },
    //     { type: 'May', value: 0.19 },
    //     { type: 'June', value: 0.22 },
    //     { type: 'July', value: 0.05 },
    //     { type: 'Aug', value: 0.07 },
    //     { type: 'Sept', value: 0.035 },
    //     { type: 'Oct', value: 0.45 },
    //     { type: 'Nov', value: 0.025 },
    //     { type: 'Dec', value: 0.095 },
    // ];

    // const configForMIncome = {
    //     monthWiseIncome,
    //     xField: 'type',
    //     yField: 'income',
    //     style: {
    //         fill: () => {
    //             return '#ffd333';
    //         },
    //     },
    //     label: {
    //         text: (originData) => {
    //             const val = parseFloat(originData.value);
    //             if (val < 0.05) {
    //                 return (val * 100).toFixed(1) + '%';
    //             }
    //             return '';
    //         },
    //         offset: 10,
    //     },
    //     legend: false,
    // };

    // const configForMOrders = {
    //     monthWiseOrders,
    //     xField: 'type',
    //     yField: 'sales',
    //     style: {
    //         fill: () => {
    //             return '#ffd333';
    //         },
    //     },
    //     label: {
    //         text: (originData) => {
    //             const val = parseFloat(originData.value);
    //             if (val < 0.05) {
    //                 return (val * 100).toFixed(1) + '%';
    //             }
    //             return '';
    //         },
    //         offset: 10,
    //     },
    //     legend: false,
    // };

    if (orders.length === 0 || yearlyData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3 className="mb-4 title">Dashboard</h3>
            <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-between align-items-end bg-white p-3 rounded-3 flex-grow-1">
                    <div>
                        <p className="desc">Total Income</p>
                        <h4 className="mb-0 sub-title">$ {yearlyData && yearlyData[0]?.amount}</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        {/* <h6><BsArrowDownRight /> 32%</h6> */}
                        <p className="mb-0 desc">Income in Last Year from Today</p>

                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-end bg-white p-3 rounded-3 flex-grow-1">
                    <div>
                        <p className="desc">Total Sales</p>
                        <h4 className="mb-0 sub-title">$ {yearlyData && yearlyData[0]?.count}</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        {/* <h6 className="red"><BsArrowDownRight /> 12%</h6> */}
                        <p className="mb-0 desc">Sales in Last Year from Today</p>

                    </div>
                </div>
                {/* <div className="d-flex justify-content-between align-items-end bg-white p-3 rounded-3 flex-grow-1">
                    <div>
                        <p className="desc  ">Total</p>
                        <h4 className="mb-0 sub-title">$1100</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="green"><BsArrowUpRight /> 32%</h6>
                        <p className="mb-0 desc">Compared to April 2024</p>

                    </div>
                </div> */}
            </div>

            {/* <div className="d-flex justify-content-between gap-3">
                <div className="mt-4 flex-grow-1 w-50 border" >
                    <h3 className="mb-5 title">Income Statics</h3>
                    <div>
                        <Column {...configForMIncome} />
                    </div>
                </div>

                <div className="mt-4 flex-grow-1 w-50 border">
                    <h3 className="mb-5 title">Sales Statics</h3>
                    <div>
                        <Column {...configForMOrders} />
                    </div>
                </div>
            </div> */}

            <div className="mt-4">
                <h3 className="mb-5 title">
                    Recent Orders
                </h3>
                <div>
                    <Table columns={columns} dataSource={ordersData} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
