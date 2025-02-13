package usecase

import (
	"skygallery/domain"
	"skygallery/infra"
)

func RegisterLikedPhotos(lp []domain.LikedPhoto, username string) error {
	if err := infra.RegisterLikedPhotos(lp, username); err != nil {
		return err
	}
	return nil
}

func SelectLikedPhotos(username string) ([]domain.LikedPhoto, error) {
	LikedPhotoArray, err := infra.SelectLikedPhotos(username)
	if err != nil {
		return nil, err
	}
	return LikedPhotoArray, nil
}

func DeleteUnlikedPhotos(username, photoId string) error {
	if err := infra.DeleteUnlikedPhotos(username, photoId); err != nil {
		return err
	}
	return nil
}
