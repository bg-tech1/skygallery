import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_GO_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// apiClient.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response && error.response.status === 401) {
//             window.location.href = "/session-timeout";
//         }
//         return Promise.reject(error);
//     }
// );

export default apiClient;
