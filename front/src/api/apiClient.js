import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_GO_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export default apiClient;
