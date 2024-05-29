import { Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPCategory } from '../features/pCategory/pCategorySlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';


const CategoriesList = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPCategory())
    }, []);

    const pCategoryState = useSelector(state => state.pCategory.productCategories);


    const columns = [
        {
            title: 'SNo.',
            dataIndex: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),

        },
        {
            title: 'Action',
            dataIndex: 'action',
        },
    ];
    const data1 = [];
    for (let i = 0; i < pCategoryState.length; i++) {
        data1.push({
            key: i + 1,
            name: pCategoryState[i].title,
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
            <h3 className="mb-4 title">Product Categories</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default CategoriesList;
