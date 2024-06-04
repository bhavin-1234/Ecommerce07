import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useDispatch, useSelector } from 'react-redux';
import { getUserWishList } from "../features/user/userSlice";
import { useEffect } from "react";
import cross from '../images/cross.svg';
import { addToWishList } from '../features/products/productSlice';

const WishList = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserWishList());
    }, []);

    const wishListState = useSelector(state => state.auth.wishlist?.wishlist);

    const removeFromWishList = (id) => {
        dispatch(addToWishList(id));
        setTimeout(() => {
            dispatch(getUserWishList());
        }, 500);
    };






    return (
        <>
            <Meta title="Wishlist" />
            <BreadCrumb title="Wishlist" />
            <Container class1="wishlist-wrapper home-wrapper-2 py-5">
                <div className="row">
                    {wishListState?.length === 0 ? <div className="text-center fs-3">No Data Found!</div> :
                        wishListState?.map((item, index) => (
                            <div key={index} className="col-3">
                                <div className="wishlist-card position-relative">
                                    <img src={cross} alt="cross" onClick={() => removeFromWishList(item._id)} className="img-fluid position-absolute cross" />
                                    <div className="wishlist-card-image bg-white">
                                        <img src={item?.images[0]?.url} className="img-fluid mx-auto d-block" alt="watch" width={160} />
                                    </div>
                                    <div className="p-3">
                                        <h5 className="title">{item?.title}</h5>
                                        <h6 className="price">${item?.price}</h6>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </>
    )
}

export default WishList;
