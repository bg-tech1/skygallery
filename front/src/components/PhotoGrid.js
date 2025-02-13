import React, { useEffect, useState } from "react";
import "./PhotoGrid.css";
import { FaHeart } from "react-icons/fa";
import { useGetUserInfo } from "../hooks/useGetUserInfo"
import apiClient from "../api/apiClient";
import { Navigate } from "react-router-dom";

const PhotoGrid = ({ photos }) => {
    const [likedPhotos, setLikedPhotos] = useState({});

    const username = useGetUserInfo();

    const toggleLike = (photoId, url) => {
        setLikedPhotos((prevLikedPhotos) => {
            const isLiked = prevLikedPhotos[photoId]?.liked || false;
            const newState = {
                ...prevLikedPhotos,
                [photoId]: { photoId, url, liked: !isLiked }
            };
            return newState;
        });
    };

    const deleteUnlikedPhotos = () => {
        setLikedPhotos((prevLikedPhotos) => {
            const newState = { ...prevLikedPhotos };
            Object.entries(newState).forEach(([photoId, data]) => {
                if (!data.liked) {
                    delete newState[photoId];
                }
            });
            return newState;
        })
    };

    // [備忘録]stateの変更を検知してからuseEffectするようにしたらうまく最新のstateを取得できた
    useEffect(() => {
        if (username) {
            const saveInterval = setInterval(() => {
                saveLikedPhotosStatus();
            }, 1000);
            return () => clearInterval(saveInterval);
        }
    }, [likedPhotos,]);
    const saveLikedPhotosStatus = async () => {
        const likedPhotosArray = Object.entries(likedPhotos).map(([photoId, data]) => ({
            photoId,
            url: data.url,
            liked: data.liked
        }));
        try {
            await apiClient.post("/registerPhoto", likedPhotosArray)
            deleteUnlikedPhotos();
        } catch (error) {
            if (error.response?.status === 401) {
                console.error("Session expired");
                window.location.href = "/session-timeout";
            } else {
                console.error("Cannot register likedphoto", error)
            }
        }
    };
    return (
        <div className="photo-grid">
            {photos.map((photo) => (
                <div key={photo.id} className="photo-item">
                    <img src={photo.urls.regular} />
                    <div
                        className={`like-icon ${likedPhotos[photo.id]?.liked ? "liked" : ""}`}
                        onClick={() => toggleLike(photo.id, photo.urls.regular)}
                    >
                        <FaHeart />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PhotoGrid;
