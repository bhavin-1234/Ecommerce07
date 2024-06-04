import { Navigate, Outlet } from "react-router-dom";
// import propTypes from "prop-types";



// const PrivateRoutes = ({ children }) => {
//     const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("digiticToken"));
//     return getTokenFromLocalStorage?.token !== undefined ? children : <Navigate to="/login" replace={true} />

// };

const PrivateRoutes = () => {
    const getTokenFromLocalStorage = (JSON.parse(localStorage.getItem("digiticToken")))?.token;
    return getTokenFromLocalStorage !== undefined ? <Outlet /> : <Navigate to="/login" />;

};


export default PrivateRoutes;


