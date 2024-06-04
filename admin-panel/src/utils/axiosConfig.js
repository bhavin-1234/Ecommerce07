import axios from "axios";
import { base_url } from "./base_url.js";
const userToken = JSON.parse(localStorage.getItem("user"))?.token;

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

const axiosInstanceWithoutAuth = axios.create({
    baseURL: base_url
});

export { axiosInstanceWithAuth, axiosInstanceWithoutAuth, axiosInstanceWithAuthAndMFD };