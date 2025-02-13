import axios from "axios";
import Navbar from "../components/Navbar";
import PhotoGrid from "../components/PhotoGrid";
import "./Home.css";
import { useEffect, useState } from "react";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { FaSync } from "react-icons/fa";
const Home = () => {
    const [photo, setPhoto] = useState();
    const [reload, setReload] = useState(false);
    const handleReload = () => {
        setReload(prev => !prev);
    };
    const apikey = process.env.REACT_APP_UNSPLASH_API_KEY;
    const fetchPhoto = () => {
        axios
            .get(
                `https://api.unsplash.com/photos/random?query=sky&count=21&client_id=${apikey}`
            )
            .then((res) => {
                if (JSON.stringify(photo) !== JSON.stringify(res.data)) {
                    setPhoto(res.data);
                    console.log(res.data);
                }
            });
    };
    useEffect(() => {
        fetchPhoto();
    }, [reload]);
    useEffect(() => {
        fetchPhoto();
    }, []);
    return (
        <div className="app-container">
            <div className="sidebar">
                <Navbar menu1="MyPage" menu2="Logout" link1="/mypage" link2="/logout" />
            </div>
            <div className="reload">
                <button className="reload-button" onClick={handleReload}>
                    <FaSync className="reload-icon" />
                    更新する
                </button>
            </div>
            <div className="content">
                {photo && < PhotoGrid photos={photo} />}
            </div>
        </div>
    );
};
export default Home;