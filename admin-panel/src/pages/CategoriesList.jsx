import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePCategory, getPCategories, resetState } from '../features/pCategory/pCategorySlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';


const CategoriesList = () => {

    const [open, setOpen] = useState(false);
    const [pCategoryId, setPCategoryId] = useState("");

    const hideModal = () => {
        setOpen(false);
    }

    const showModal = (id) => {
        setOpen(true);
        setPCategoryId(id);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState());
        dispatch(getPCategories());
    }, []);

    const pCategoryState = useSelector(state => state.pCategory.productCategories);

    const { isSuccess, isError, deletedPCategory } = useSelector(state => state.pCategory);

    useEffect(() => {
        if (isSuccess && deletedPCategory) {
            toast.success("Product Category Deleted Successfully!", {
                onClose: () => {
                    dispatch(resetState());
                    dispatch(getPCategories());
                }
            });
        }

    }, [isSuccess, isError, deletedPCategory]);


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
                    <Link
                        className="fs-3 text-danger"
                        to={`/admin/category/${pCategoryState[i]._id}`}
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
                        onClick={() => showModal(pCategoryState[i]._id)}
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
        dispatch(deletePCategory(pCategoryId));
        hideModal();
    };

    return (
        <div>
            <h3 className="mb-4 title">Product Categories</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <CustomModal title="Are you sure you want to delete this Product Category?" performAction={() => handleDelete()} open={open} hideModal={hideModal} />
            </div>
        </div>
    )
}

export default CategoriesList;
