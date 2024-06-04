import { Navigate, Outlet } from "react-router-dom";



const AuthenticRoutes = () => {
    const getTokenFromLocalStorage = (JSON.parse(localStorage.getItem("digiticToken")))?.token;
    return getTokenFromLocalStorage !== undefined ? <Navigate to="/" /> : <Outlet />;

};

export default AuthenticRoutes;



