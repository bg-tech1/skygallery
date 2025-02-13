package usecase

import (
	"fmt"
	"skygallery/infra"
	"skygallery/pkg/util"
)

func LoginUser(username, password string) (bool, error) {
	hashedPassword, err := infra.SelectUser(username)
	if err != nil {
		return false, err
	}
	userExists := util.ComparePassword(hashedPassword, password)
	return userExists, nil
}

func RegisterUser(username, password string) error {
	hashedPassword, err := util.HashPassword(password)
	if err != nil {
		fmt.Println("Failed to hash password")
		return err
	}
	if err := infra.CreateUser(username, hashedPassword); err != nil {
		return err
	}
	return nil
}
