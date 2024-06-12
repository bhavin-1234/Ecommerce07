import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from 'react-toastify';
import { Suspense } from "react";
// import { ErrorBoundary } from "react-error-boundary";
// import fallbackRender from "./ErrorBoundary";

const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<h1 className="text-center text-danger p-5">Loading...</h1>}>
        <Outlet />
      </Suspense>
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
      <Footer />
    </>
  );
};

export default Layout;
