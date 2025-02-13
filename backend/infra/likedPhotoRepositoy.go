package infra

import (
	"log"
	"skygallery/domain"
)

func RegisterLikedPhotos(photos []domain.LikedPhoto, username string) error {
	for _, photo := range photos {
		if photo.Liked {
			photo.Username = username
			result := dc.DB.Create(&photo)
			if result.Error != nil {
				log.Println("Cannot register liked photo:", result.Error)
			}
		} else {
			err := DeleteUnlikedPhotos(username, photo.PhotoId)
			if err != nil {
				log.Println("Cannot delete unliked photo:", err)
			}
		}
	}
	return nil
}

func SelectLikedPhotos(username string) ([]domain.LikedPhoto, error) {
	var likedPhotos []domain.LikedPhoto
	result := dc.DB.Where("username = ?", username).Find(&likedPhotos)
	if result.Error != nil {
		log.Println("Cannot select liked photos:", result.Error)
		return nil, result.Error
	}
	return likedPhotos, nil
}

func DeleteUnlikedPhotos(username, photoId string) error {
	result := dc.DB.Where("username = ? AND photo_id = ?", username, photoId).Delete(&domain.LikedPhoto{})
	if result.Error != nil {
		log.Println("Cannot delete unliked photo:", result.Error)
		return result.Error
	}
	return nil
}
