import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteColor, getColors, resetState } from '../features/color/colorSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';




const ColorList = () => {


    const [open, setOpen] = useState(false);
    const [colorId, setColorId] = useState("");

    const hideModal = () => {
        setOpen(false);
    }

    const showModal = (id) => {
        setOpen(true);
        setColorId(id);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState());
        dispatch(getColors());
    }, []);

    const colorState = useSelector(state => state.color.colors);

    const { isSuccess, isError, deletedColor } = useSelector(state => state.color);

    useEffect(() => {
        if (isSuccess && deletedColor) {
            toast.success("Color Deleted Successfully!", {
                onClose: () => {
                    dispatch(resetState());
                    dispatch(getColors());
                }
            });
        }

    }, [isSuccess, isError, deletedColor]);



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
    for (let i = 0; i < colorState.length; i++) {
        data1.push({
            key: i + 1,
            name: colorState[i].title,
            action:
                <>
                    <Link
                        className="fs-3 text-danger"
                        to={`/admin/color/${colorState[i]._id}`}
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
                        onClick={() => showModal(colorState[i]._id)}
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
        dispatch(deleteColor(colorId));
        hideModal();
    };

    return (
        <div>
            <h3 className="mb-4 title">Colors</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <CustomModal title="Are you sure you want to delete this Color?" performAction={() => handleDelete()} open={open} hideModal={hideModal} />
            </div>
        </div>
    )
}

export default ColorList;
