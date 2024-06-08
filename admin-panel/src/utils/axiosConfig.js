import { base_url } from "./base_url";
import axios from "axios";
const userToken = (JSON.parse(localStorage.getItem("user")))?.token;

const axiosInstanceWithoutAuth = axios.create({
    baseURL: base_url
});

const axiosInstanceWithAuth = axios.create({
    baseURL: base_url,
    headers: {
        Authorization: userToken ? `Bearer ${userToken}` : "",
    }
});

const axiosInstanceWithAuthAndMFD = axios.create({
    baseURL: base_url,
    headers: {
        Authorization: userToken ? `Bearer ${userToken}` : "",
        "Content-Type": "multipart/form-data",

    }
});



export { axiosInstanceWithAuth, axiosInstanceWithoutAuth, axiosInstanceWithAuthAndMFD };