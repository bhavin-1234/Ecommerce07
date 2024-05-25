import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Enquiry from './pages/Enquiry';
import BlogList from './pages/BlogList';
import BlogCategory from './pages/BlogCategory';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import ColorList from './pages/ColorList';
import CategoriesList from './pages/CategoriesList';
import BrandList from './pages/BrandList';
import ProductsList from './pages/ProductList';
import AddBlog from './pages/AddBlog';
import AddBlogCategory from './pages/AddBlogCategory';
import AddColor from './pages/AddColor';
import AddCategory from './pages/AddCategory';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
// import Enquiry from './pages/Enquiry';
// import Enquiry from './pages/Enquiry';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="enquiries" element={<Enquiry />} />
            <Route path="blog" element={<AddBlog />} />
            <Route path="blog-list" element={<BlogList />} />
            <Route path="blog-category" element={<AddBlogCategory />} />
            <Route path="blog-category-list" element={<BlogCategory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="color" element={<AddColor />} />
            <Route path="color-list" element={<ColorList />} />
            <Route path="category" element={<AddCategory />} />
            <Route path="category-list" element={<CategoriesList />} />
            <Route path="brand" element={<AddBrand />} />
            <Route path="brand-list" element={<BrandList />} />
            <Route path="product" element={<AddProduct />} />
            <Route path="product-list" element={<ProductsList />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
