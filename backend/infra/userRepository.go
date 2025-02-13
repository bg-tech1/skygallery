package infra

import (
	"log"
	"skygallery/domain"
)

func CreateUser(username, password string) error {
	user := domain.User{Username: username, Password: password}
	result := dc.DB.Create(&user)
	if result.Error != nil {
		log.Println("Cannot register user:", result.Error)
		return result.Error
	}
	return nil
}

func SelectUser(username string) (string, error) {
	var user domain.User
	result := dc.DB.First(&user, "username = ?", username)
	if result.Error != nil {
		log.Println("Cannot select user:", result.Error)
		return "", result.Error
	}
	return user.Password, nil
}
