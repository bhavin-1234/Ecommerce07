import { base_url } from "./base_url";
import axios from "axios";
const userToken = (JSON.parse(localStorage.getItem("digiticToken")))?.token;


const axiosInstanceWithoutAuth = axios.create({
    baseURL: base_url
});

const axiosInstanceWithAuth = axios.create({
    baseURL: base_url,
    headers: {
        Authorization: userToken ? `Bearer ${userToken}` : ""
    }
});

const axiosInstanceWithAuthANDMFD = axios.create({
    baseURL: base_url,
    headers: {
        Authorization: userToken ? `Bearer ${userToken}` : "",
        "Content-Type": "multipart/form-data"
    }
});

export { axiosInstanceWithoutAuth, axiosInstanceWithAuth, axiosInstanceWithAuthANDMFD }

