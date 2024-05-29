import { Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBCategory } from '../features/bCategory/bCategorySlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';



const BlogCategory = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBCategory())
    }, []);

    const bCategoryState = useSelector(state => state.bCategory.blogCategories);
    console.log(bCategoryState);


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
            title: 'Action',
            dataIndex: 'action',
        }
    ];
    const data1 = [];
    for (let i = 0; i < bCategoryState.length; i++) {
        data1.push({
            key: i + 1,
            name: bCategoryState[i].title,
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
            <h3 className="mb-4 title">Blogs Categories</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default BlogCategory;
