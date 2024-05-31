import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts, resetState } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Tooltip } from 'react-tooltip';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';



const ProductsList = () => {

    const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState("");

    const hideModal = () => {
        setOpen(false);
    }

    const showModal = (id) => {
        setOpen(true);
        setProductId(id);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetState());
        dispatch(getProducts());
    }, []);

    const productState = useSelector(state => state.product.products);

    const { isSuccess, isError, deletedProduct } = useSelector(state => state.product);

    useEffect(() => {
        if (isSuccess && deletedProduct) {
            toast.success("Product Deleted Successfully!", {
                onClose: () => {
                    dispatch(resetState());
                    dispatch(getProducts());
                }
            });
        }

    }, [isSuccess, isError, deletedProduct]);


    const columns = [
        {
            title: 'SNo.',
            dataIndex: 'key',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            sorter: (a, b) => a.brand.localeCompare(b.brand),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            sorter: (a, b) => a.category.localeCompare(b.category),
        },
        {
            title: 'Price ($)',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Color',
            dataIndex: 'color',
        },
        {
            title: 'Action',
            dataIndex: 'action',
        },
    ];
    const data1 = [];
    for (let i = 0; i < productState.length; i++) {
        data1.push({
            key: i + 1,
            title: productState[i].title,
            brand: productState[i].brand,
            category: productState[i].category,
            price: productState[i].price,
            color: productState[i].color.join(", "),
            action:
                <>
                    <Link
                        className="fs-3 text-danger"
                        to={`/admin/product/${productState[i]._id}`}
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
                        onClick={() => showModal(productState[i]._id)}
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
        dispatch(deleteProduct(productId));
        hideModal();
    };

    return (
        <div>
            <h3 className="mb-4 title">Products</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <div>
                <CustomModal title="Are you sure you want to delete this Product?" performAction={() => handleDelete()} open={open} hideModal={hideModal} />
            </div>
        </div>
    )
}

export default ProductsList;
