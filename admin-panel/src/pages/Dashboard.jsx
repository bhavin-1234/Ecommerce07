import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
// import { BsArrowDownRight } from "react-icons/bs";
import { Column } from '@ant-design/plots';
import { Table } from 'antd';

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
        title: 'Product',
        dataIndex: 'product',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
    data1.push({
        SNo: i,
        name: `Edward King ${i}`,
        product: 32,
        status: `London, Park Lane no. ${i}`,
    });
}

const Dashboard = () => {

    const data = [
        { type: 'Jan', value: 0.16 },
        { type: 'Feb', value: 0.125 },
        { type: 'March', value: 0.24 },
        { type: 'April', value: 0.24 },
        { type: 'May', value: 0.19 },
        { type: 'June', value: 0.22 },
        { type: 'July', value: 0.05 },
        { type: 'Aug', value: 0.07 },
        { type: 'Sept', value: 0.035 },
        { type: 'Oct', value: 0.45 },
        { type: 'Nov', value: 0.025 },
        { type: 'Dec', value: 0.095 },
    ];

    const config = {
        data,
        xField: 'type',
        yField: 'value',
        style: {
            fill: () => {
                return '#ffd333';
            },
        },
        label: {
            text: (originData) => {
                const val = parseFloat(originData.value);
                if (val < 0.05) {
                    return (val * 100).toFixed(1) + '%';
                }
                return '';
            },
            offset: 10,
        },
        legend: false,
    };
    return (
        <div>
            <h3 className="mb-4 title">Dashboard</h3>
            <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex justify-content-between align-items-end bg-white p-3 rounded-3 flex-grow-1">
                    <div>
                        <p className="desc">Total</p>
                        <h4 className="mb-0 sub-title">$1100</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6><BsArrowDownRight /> 32%</h6>
                        <p className="mb-0 desc">Compared to April 2024</p>

                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-end bg-white p-3 rounded-3 flex-grow-1">
                    <div>
                        <p className="desc">Total</p>
                        <h4 className="mb-0 sub-title">$1100</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="red"><BsArrowDownRight /> 12%</h6>
                        <p className="mb-0 desc">Compared to April 2024</p>

                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-end bg-white p-3 rounded-3 flex-grow-1">
                    <div>
                        <p className="desc  ">Total</p>
                        <h4 className="mb-0 sub-title">$1100</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="green"><BsArrowUpRight /> 32%</h6>
                        <p className="mb-0 desc">Compared to April 2024</p>

                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-5 title">Income Statics</h3>
                <div>
                    <Column {...config} />
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-5 title">
                    Recent Orders
                </h3>
                <div>
                    <Table columns={columns} dataSource={data1} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
