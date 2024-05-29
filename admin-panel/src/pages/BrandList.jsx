import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getAllBrands, resetState } from '../features/brand/brandSlice';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { Tooltip } from "react-tooltip";
import { toast } from 'react-toastify';
import CustomModal from '../components/CustomModal';


const BrandList = () => {

    const [open, setOpen] = useState(false);
    const [brandId, setBrandId] = useState("");

    const showModal = (id) => {
        setOpen(true);
        setBrandId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState());
        dispatch(getAllBrands());
    }, [dispatch]);

    const brandState = useSelector(state => state.brand.brands);

    const deletedBrandState = useSelector(state => state.brand);
    const { isSuccess, isError, deletedBrand } = deletedBrandState;

    useEffect(() => {
        isSuccess && deletedBrand && toast.success("Brand Deleted Successfully!", {
            onClose: () => {
                dispatch(resetState());
                dispatch(getAllBrands());
            }
        })

    }, [isSuccess, isError, deletedBrand, dispatch]);



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
        },
    ];
    const data1 = [];
    for (let i = 0; i < brandState.length; i++) {
        data1.push({
            key: i + 1,
            name: brandState[i].title,
            action:
                <>
                    <Link
                        to={`/admin/brand/${brandState[i]._id}`}
                        className="fs-3 text-danger" data-tooltip-id="my-tooltip-1"
                        data-tooltip-content="Edit"
                        data-tooltip-place="bottom"
                        data-tooltip-class-name="rounded-5 px-3 py-0"
                        data-tooltip-variant="info"
                    >
                        <BiEdit />
                    </Link>
                    <Tooltip id="my-tooltip-1" />
                    <button
                        type="button"
                        onClick={() => showModal(brandState[i]._id)}
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

    const deleteABrand = (id) => {
        dispatch(deleteBrand(id));
        hideModal();
    }


    return (
        <div>
            <h3 className="mb-4 title">Brands</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <CustomModal title="Are you sure you want to delete this Brand?" performAction={() => deleteABrand(brandId)} hideModal={hideModal} open={open} />
            </div>
        </div>
    )
}

export default BrandList;
