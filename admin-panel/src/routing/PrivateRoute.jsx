import { Navigate } from "react-router-dom";
import propTypes from "prop-types";


const PrivateRoutes = ({ children }) => {

    const getTokenFromLocaltorage = (JSON.parse(localStorage.getItem("user")))?.token;
    return getTokenFromLocaltorage !== undefined ? children : <Navigate to="/login" />;
};

PrivateRoutes.propTypes = {
    children: propTypes.node
}

export default PrivateRoutes;