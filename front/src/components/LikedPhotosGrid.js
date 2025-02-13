import { useState } from "react";
import "./LikedPhotosGrid.css"
import apiClient from "../api/apiClient";
const LikedPhotosGrid = ({ photos, setPhotos }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
    };
    const toggleLike = (photoId) => {
        setPhotos((prevPhotos) => prevPhotos.filter(photo => photo.photoId !== photoId));
    };

    const removeLike = async (event) => {
        event.stopPropagation();
        if (!selectedPhoto) return;
        try {
            await apiClient.post("/deleteUnlikedPhoto", {
                photoId: selectedPhoto.photoId
            });
            setSelectedPhoto(null);
            toggleLike(selectedPhoto.photoId)
        } catch (error) {
            if (error.response?.status === 401) {
                console.error("Session expired");
                window.location.href = "/session-timeout";
            } else {
                console.error("Cannot retrieve likedphoto", error)
            }
        }
    };
    return (
        <div className="photo-grid">
            {photos.map((photo) => (
                <div key={photo.photoId} className="photo-item"
                    onClick={() => handlePhotoClick(photo)}
                    style={{ position: "relative" }} >
                    <img src={photo.url} />
                    {selectedPhoto?.photoId === photo.photoId && (
                        <div className="unlike-modal">
                            <p>いいねを外しますか？</p>
                            <button onClick={(e) => { removeLike(e) }}>いいねを解除</button>
                            <button onClick={(e) => { e.stopPropagation(); setSelectedPhoto(null); }}>キャンセル</button>                        </div>
                    )}
                </div>
            ))}
        </div>

    );
};
export default LikedPhotosGrid;