import { useEffect, useState } from 'react';
import { useNavigate, Outlet, Link } from "react-router-dom";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Header, Sider, Content } = Layout;
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { AiOutlineBgColors, AiOutlineUser, AiOutlineShoppingCart, AiOutlineDashboard } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { ImBlog } from "react-icons/im";
import { RiCouponLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { useSelector } from 'react-redux';

const MainLayout = () => {

    useEffect(() => {
        const login = JSON.parse(localStorage.getItem("user"));
        if (!login) {
            navigate("/");
        }
    })

    const { user } = useSelector(state => state.auth);




    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical">
                    <h2 className='text-white fs-5 text-center py-3 mb-0'>
                        <span className='sm-logo'>A</span>
                        <span className='lg-logo'>Avkash</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        if (key === "signout") {
                            localStorage.clear();
                            window.location.reload();
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <AiOutlineDashboard className='fs-4' />,
                            label: 'Dashboard',
                        },
                        {
                            key: 'customers',
                            icon: <AiOutlineUser className='fs-4' />,
                            label: 'Customers',
                        },
                        {
                            key: 'catalogue',
                            icon: <AiOutlineShoppingCart className='fs-4' />,
                            label: 'Catalogue',
                            children: [
                                {
                                    key: 'product',
                                    icon: <AiOutlineShoppingCart className='fs-4' />,
                                    label: 'Add Product',
                                },
                                {
                                    key: 'product-list',
                                    icon: <AiOutlineShoppingCart className='fs-4' />,
                                    label: 'Product List',
                                },
                                {
                                    key: 'brand',
                                    icon: <SiBrandfolder className='fs-4' />,
                                    label: 'Add Brand',
                                },
                                {
                                    key: 'brand-list',
                                    icon: <SiBrandfolder className='fs-4' />,
                                    label: 'Brand List',
                                },
                                {
                                    key: 'category',
                                    icon: <BiCategoryAlt className='fs-4' />,
                                    label: 'Add Category',
                                },
                                {
                                    key: 'category-list',
                                    icon: <BiCategoryAlt className='fs-4' />,
                                    label: 'Category List',
                                },
                                {
                                    key: 'color',
                                    icon: <AiOutlineBgColors className='fs-4' />,
                                    label: 'Add Color',
                                },
                                {
                                    key: 'color-list',
                                    icon: <AiOutlineBgColors className='fs-4' />,
                                    label: 'Color List',
                                },

                            ]
                        },
                        {
                            key: 'orders',
                            icon: <FaClipboardList className='fs-4' />,
                            label: 'Orders',
                        },
                        {
                            key: 'marketing',
                            icon: <RiCouponLine className='fs-4' />,
                            label: 'Marketing',
                            children: [
                                {
                                    key: 'coupon',
                                    icon: <ImBlog className='fs-4' />,
                                    label: 'Add Coupon',
                                },
                                {
                                    key: 'coupon-list',
                                    icon: <RiCouponLine className='fs-4' />,
                                    label: 'Coupon List',
                                }
                            ]
                        },
                        {
                            key: 'blogs',
                            icon: <FaBloggerB className='fs-4' />,
                            label: 'Blogs',
                            children: [
                                {
                                    key: 'blog',
                                    icon: <ImBlog className='fs-4' />,
                                    label: 'Add Blog',
                                },
                                {
                                    key: 'blog-list',
                                    icon: <FaBloggerB className='fs-4' />,
                                    label: 'Blog List',
                                },
                                {
                                    key: 'blog-category',
                                    icon: <ImBlog className='fs-4' />,
                                    label: 'Add Blog Category',
                                },
                                {
                                    key: 'blog-category-list',
                                    icon: <FaBloggerB className='fs-4' />,
                                    label: 'Blog Category List',
                                },
                            ]
                        },
                        {
                            key: 'enquiries',
                            icon: <FaClipboardList className='fs-4' />,
                            label: 'Enquiries',
                        },
                        {
                            key: 'signout',
                            icon: <AiOutlineLogout className='fs-4' />,
                            label: 'Sign Out',
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    className='d-flex justify-content-between align-items-center ps-1 pe-5'
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className='d-flex align-items-center gap-4'>
                        <div className='position-relative'>
                            <IoIosNotifications className='fs-4' />
                            <span className="badge bg-warning rounded-circle p-1 position-absolute">3</span>
                        </div>
                        <div className='d-flex gap-3 align-items-center' role="button" data-bs-toggle="dropdown">
                            <div>
                                <img style={{ height: 32, width: 32, borderRadius: 3 }} src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg" alt="profile" />
                            </div>
                            <div>
                                <h5 className='text-dark mb-0 text-capitalize'>{user?.firstname + " " + user?.lastname}</h5>
                                <p className='mb-0'>{user?.email}</p>
                            </div>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item py-2 mb-1" style={{ height: "auto", lineHeight: "20px" }} to="/">View Profile</Link></li>
                                <li><Link className="dropdown-item py-2 mb-1" style={{ height: "auto", lineHeight: "20px" }} to="/">Signout</Link></li>
                            </ul>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        theme="light"
                    />
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout;
