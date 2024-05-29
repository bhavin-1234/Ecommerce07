import axios from "axios";
import { base_url } from "./base_url";

const userToken = JSON.parse(localStorage.getItem("user"))?.token;

const axiosInstanceWithAuth = axios.create({
    baseURL: base_url,
    headers: {
        Authorization: userToken ? `Bearer ${userToken}` : "",
    }
})

const axiosInstanceWithoutAuth = axios.create({
    baseURL: base_url
});

export { axiosInstanceWithAuth, axiosInstanceWithoutAuth };