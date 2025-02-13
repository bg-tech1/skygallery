import Navbar from "../components/Navbar";
import { UserInfo } from "../components/UserInfo";
import { useEffect, useState } from "react";
import LikedPhotosGrid from "../components/LikedPhotosGrid";
import "./Mypage.css"
import { useGetUserInfo } from "../hooks/useGetUserInfo"
import apiClient from "../api/apiClient";
export const MyPage = () => {
    const [photos, setPhotos] = useState([]);
    const username = useGetUserInfo();
    const selectLikedPhotos = async () => {
        try {
            const response = await apiClient.get("/selectLikedPhoto");
            setPhotos(response.data.photo);
            console.log(response.data.photo)
        } catch (error) {
            console.error("CannotSelectLikedPhoto", error)
        }
    }
    useEffect(() => {
        if (username) {
            selectLikedPhotos();
        }
    }, [username]);
    return (
        <div className="app-container">
            <div className="sidebar">
                <Navbar menu1="Home" menu2="Logout" link1="/home" link2="/logout" />
            </div>
            <div className="userInfoContainer">
                <UserInfo username={username} />
            </div>
            <div className="mypageText">
                いいね済みの写真
            </div>
            <div className="content">
                {photos && <LikedPhotosGrid photos={photos} username={username} setPhotos={setPhotos} />}
            </div>
        </div>

    );
}