import axios from "axios";

export default axios.create({
    baseURL: "/api",
    // timeout: 0,
    withCredentials: true
});