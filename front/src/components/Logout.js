import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

const Logout = () => {
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_GO_BASE_URL;

    useEffect(() => {
        const logout = async () => {
            try {
                await apiClient.post("/logout");
                navigate("/");
            } catch (error) {
                console.error("ログアウトに失敗しました", error);
                navigate("/");
            }
        };
        logout();
    }, [navigate]);

    return <p>ログアウト中...</p>;
};

export default Logout;
