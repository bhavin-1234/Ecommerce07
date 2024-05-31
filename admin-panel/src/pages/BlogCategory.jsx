import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBCategory, getBCategories, resetState } from '../features/bCategory/bCategorySlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';



const BlogCategory = () => {


    const [open, setOpen] = useState(false);
    const [bCategoryId, setBCategoryId] = useState("");

    const hideModal = () => {
        setOpen(false);
    }

    const showModal = (id) => {
        setOpen(true);
        setBCategoryId(id);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState());
        dispatch(getBCategories());
    }, []);

    const bCategoryState = useSelector(state => state.bCategory.blogCategories);

    const { isSuccess, isError, deletedBCategory } = useSelector(state => state.bCategory);

    useEffect(() => {
        if (isSuccess && deletedBCategory) {
            toast.success("Blog Category Deleted Successfully!", {
                onClose: () => {
                    dispatch(resetState());
                    dispatch(getBCategories());
                }
            });
        }

    }, [isSuccess, isError, deletedBCategory]);




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
                    <Link
                        className="fs-3 text-danger"
                        to={`/admin/blog-category/${bCategoryState[i]._id}`}
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
                        onClick={() => showModal(bCategoryState[i]._id)}
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
        dispatch(deleteBCategory(bCategoryId));
        hideModal();
    };


    return (
        <div>
            <h3 className="mb-4 title">Blogs Categories</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <CustomModal title="Are you sure you want to delete this Blog Category?" performAction={() => handleDelete()} open={open} hideModal={hideModal} />
            </div>
        </div>
    )
}

export default BlogCategory;
