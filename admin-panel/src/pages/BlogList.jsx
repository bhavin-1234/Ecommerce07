import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getBlogs, resetState } from '../features/blogs/blogSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';


const BlogList = () => {

    const [open, setOpen] = useState(false);
    const [blogId, setBlogId] = useState("");

    const hideModal = () => {
        setOpen(false);
    }

    const showModal = (id) => {
        setOpen(true);
        setBlogId(id);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState());
        dispatch(getBlogs());
    }, []);

    const blogState = useSelector(state => state.blog.blogs?.allBlog);

    const { isSuccess, isError, deletedBlog } = useSelector(state => state.blog);

    useEffect(() => {
        if (isSuccess && deletedBlog) {
            toast.success("Blog Deleted Successfully!", {
                onClose: () => {
                    dispatch(resetState());
                    dispatch(getBlogs());
                }
            });
        }

    }, [isSuccess, isError, deletedBlog]);





    const columns = [
        {
            title: 'SNo.',
            dataIndex: 'key',
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Category',
            dataIndex: 'category'
        },
        {
            title: 'Action',
            dataIndex: 'action',
        },
    ];
    const data1 = [];
    for (let i = 0; i < blogState?.length; i++) {
        data1.push({
            key: i + 1,
            title: blogState[i].title,
            category: blogState[i].category,
            action:
                <>
                    <Link
                        className="fs-3 text-danger"
                        to={`/admin/blog/${blogState[i]._id}`}
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
                        onClick={() => showModal(blogState[i]._id)}
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
        dispatch(deleteBlog(blogId));
        hideModal();
    };

    return (
        <div>
            <h3 className="mb-4 title">Blogs List</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <CustomModal title="Are you sure you want to delete this Blog?" performAction={() => handleDelete()} open={open} hideModal={hideModal} />
            </div>
        </div>
    )
}

export default BlogList;
