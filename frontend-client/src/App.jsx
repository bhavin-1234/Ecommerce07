import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import WishList from "./pages/WishList";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermsAndCondition from "./pages/TermsAndCondition";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import PrivateRoutes from "./routing/PrivateRoutes";
import AuthenticRoutes from "./routing/AuthenticRoutes";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="terms-conditions" element={<TermsAndCondition />} />

            <Route element={<AuthenticRoutes />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Route>

            <Route element={<PrivateRoutes />}>
              <Route path="checkout" element={<Checkout />} />
              <Route path="wishlist" element={<WishList />} />
              <Route path="my-orders" element={<Orders />} />
              <Route path="cart" element={<Cart />} />
              <Route path="my-profile" element={<Profile />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route index element={<Home />} />
//             <Route path="contact" element={<Contact />} />
//             <Route path="product" element={<OurStore />} />
//             <Route path="product/:id" element={<SingleProduct />} />
//             <Route path="blogs" element={<Blog />} />
//             <Route path="blog/:id" element={<SingleBlog />} />
//             {/* <Route path="cart" element={<PrivateRoutes><Cart /></PrivateRoutes>} /> */}
//             {/* <Route path="cart" element={<Cart />} /> */}
//             {/* <Route path="checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>} /> */}
//             <Route path="checkout" element={<Checkout />} />
//             {/* <Route path="my-orders" element={<PrivateRoutes><Orders /></PrivateRoutes>} /> */}
//             <Route path="my-orders" element={<Orders />} />
//             <Route path="my-profile" element={<Profile />} />
//             {/* <Route path="my-profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} /> */}
//             <Route path="compare-product" element={<CompareProduct />} />
//             {/* <Route path="wishlist" element={<PrivateRoutes><WishList /></PrivateRoutes>} /> */}
//             <Route path="wishlist" element={<WishList />} />
//             {/* <Route path="login" element={<OpenRoutes><Login /></OpenRoutes>} /> */}
//             <Route path="login" element={<Login />} />
//             <Route path="forgot-password" element={<ForgotPassword />} />
//             {/* <Route path="signup" element={<OpenRoutes><SignUp /></OpenRoutes>} /> */}
//             <Route path="signup" element={<SignUp />} />
//             <Route path="reset-password" element={<ResetPassword />} />
//             <Route path="privacy-policy" element={<PrivacyPolicy />} />
//             <Route path="refund-policy" element={<RefundPolicy />} />
//             <Route path="shipping-policy" element={<ShippingPolicy />} />
//             <Route path="terms-conditions" element={<TermsAndCondition />} />
//           </Route>
//           <Route element={<PrivateRoutes />}>
//             <Route path="/cart" element={<Cart />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }


export default App;
