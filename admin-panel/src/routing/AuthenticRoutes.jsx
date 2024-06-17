import { Navigate } from "react-router-dom";
import propTypes from "prop-types";

const AuthenticRoutes = ({ children }) => {

    const getTokenFromLocaltorage = (JSON.parse(localStorage.getItem("user")))?.token;
    return getTokenFromLocaltorage !== undefined ? <Navigate to="/admin" /> : children;
};

AuthenticRoutes.propTypes = {
    children: propTypes.node
}

export default AuthenticRoutes;