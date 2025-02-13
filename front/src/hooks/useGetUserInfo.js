import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";

export const useGetUserInfo = () => {
    const [userinfo, setUserInfo] = useState("");
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await apiClient.get("/userinfo");
                setUserInfo(response.data.username);
            } catch (error) {
                if (error.response?.status === 401) {
                    console.error("Session expired");
                    window.location.href = "/session-timeout";
                } else {
                    console.error("Cannot fetch user info", error);
                }
            }
        };

        getUserInfo();
    }, []);

    return userinfo;
};
