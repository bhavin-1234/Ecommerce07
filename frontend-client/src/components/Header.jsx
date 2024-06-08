import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import wishlist from "../images/wishlist.svg";
// import compare from "../images/compare.svg";
import userPic from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCart } from "../features/user/userSlice";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getProduct } from "../features/products/productSlice";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(null);
  const authState = useSelector(state => state.auth);
  const [paginate, setPaginate] = useState(true);
  const productState = useSelector(state => state?.product?.products);
  const [productOpt, setProductOpt] = useState([]);

  const cartsProducts = useSelector((state) => state.auth?.cartProducts);
  const { user } = useSelector((state) => state.auth);



  useEffect(() => {
    authState.user !== null && dispatch(getCart());
  }, []);





  useEffect(() => {
    const total = Array.isArray(cartsProducts) && cartsProducts?.reduce((accum, item) => {
      return accum += (item?.price * item?.quantity);
    }, 0);
    setTotalAmount(total);

  }, [cartsProducts]);

  useEffect(() => {
    let data = [];
    for (let i = 0; i < productState?.length; i++) {
      const element = productState[i];
      data.push({
        id: i,
        prod: element?._id,
        name: element?.title
      });
      setProductOpt(data);
    }
  }, [productState]);






  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  const token = JSON.parse(localStorage.getItem("digiticToken"))?.token;




  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+91 8264954234">
                  +91 8264954234
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white">Avakash</Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                {/* <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search  Product Here..."
                  aria-label="Search  Product Here..."
                  aria-describedby="basic-addon2"
                /> */}
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log('Results paginated')}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getProduct(selected[0]?.prod));
                  }}
                  options={productOpt}
                  paginate={paginate}
                  labelKey={"name"}
                  minLength={2}
                  placeholder="Search for Products here..."
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  {<BsSearch className="fs-6" />}
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-end gap-30">
                {/* <div>
                  <Link to="/compare-product" className="d-flex align-items-center gap-10 text-white" >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div> */}
                <div>
                  <Link to="/wishlist" className="d-flex align-items-center gap-10 text-white">
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Favourites
                      <br /> Wishlist
                    </p>
                  </Link>
                </div>




                {/* <div>
                  {
                    !user ? (<Link to="/login" className="d-flex align-items-center gap-10 text-white">
                      <img src={userPic} alt="user" />
                      <p className="mb-0">Login<br />My Account</p>
                    </Link>) :
                      (<div className="d-flex align-items-center gap-10 text-white">
                        <img src={userPic} alt="user" />
                        <p className="mb-0" style={{ cursor: "default" }}>Welcome<br />{user?.firstname}</p>
                      </div>)
                  }
                </div> */}



                <div>
                  {
                    <Link
                      to={!user ? `/login` : "/my-profile"}
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img src={userPic} alt="user" />
                      <p className="mb-0">
                        {!user ? (
                          <>
                            Login <br /> My Account
                          </>
                        ) : (
                          <>
                            Welcome <br /> {user?.firstname}
                          </>
                        )
                        }
                      </p>
                    </Link>
                  }
                </div>


                {/* (<div className="d-flex align-items-center gap-10 text-white">
                    <img src={userPic} alt="user" />
                    <p className="mb-0" style={{ cursor: "default" }}>Welcome<br />{user?.firstname}</p>
                  </div>)
                  } */}






                {/* <div>
                  <Link to="/login" className="d-flex align-items-center gap-10 text-white">
                    <img src={userPic} alt="user" />
                    {!user ? <p className="mb-0">Login<br />My Account</p> :
                      <p className="mb-0">Welcome<br />{user.firstname}</p>}
                  </Link>
                </div> */}
                <div>
                  <Link to="/cart" className="d-flex align-items-center gap-10 text-white">
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">{Array.isArray(cartsProducts) && cartsProducts?.length}</span>
                      <p className="mb-0">{Array.isArray(cartsProducts) && Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD"
                      }).format(totalAmount)}</p>
                      {/* <p className="mb-0">{totalAmount ? Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD"
                      }).format(totalAmount) : `$ 0`}</p> */}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center justify-content-between gap-30">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center me-5"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src={menu} alt="menu" />
                        <span className="d-inline-block">Shop Categories</span>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item text-white" to="">
                            Action
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item text-white" to="">
                            Another action
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item text-white" to="">
                            Something else here
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="menu-links">
                    <div className="d-flex align-items-center gap-15">
                      <NavLink to="/">Home</NavLink>
                      <NavLink to="/product">Our Store</NavLink>
                      <NavLink to="/blogs">Blogs</NavLink>
                      <NavLink to="/my-orders">My Orders</NavLink>
                      <NavLink to="/contact">Contact</NavLink>
                    </div>
                  </div>
                </div>
                <div>
                  {
                    token &&
                    <button type="button" className="text-white border-0 rounded-3 p-2 text-uppercase ms-auto" style={{
                      backgroundColor: "#febd69"
                    }} onClick={() => handleLogOut()}>
                      Logout
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
