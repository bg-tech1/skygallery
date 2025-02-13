package handler

import (
	"net/http"
	"os"
	"skygallery/domain"
	"skygallery/infra"
	"skygallery/usecase"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.POST("/deleteUnlikedPhoto", deleteUnlikedPhotoHandler)
	r.POST("/login", loginHandler)
	r.POST("/logout", logoutHandler)
	r.POST("/register", registerUserHandler)
	r.POST("/registerPhoto", registerLikedPhotosHandler)
	r.GET("/home", homePageHandler)
	r.GET("/selectLikedPhoto", selectLikedPhotoHandler)
	r.GET("/userinfo", userInfoHandler)
}

func deleteUnlikedPhotoHandler(c *gin.Context) {
	var params struct {
		PhotoId string `json:"photoId"`
	}
	if err := c.BindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}
	cookieKey := os.Getenv("LOGIN_USER_ID_KEY")
	username := infra.GetSession(c, cookieKey).(string)
	if username == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Login Failed"})
		return
	}
	err := usecase.DeleteUnlikedPhotos(username, params.PhotoId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unexpected Error"})
	} else {
		c.JSON(http.StatusOK, gin.H{"message": "UpdateLikedPhtosStatus successful"})
	}
}

func homePageHandler(c *gin.Context) {
	cookieKey := os.Getenv("LOGIN_USER_ID_KEY")
	username := infra.GetSession(c, cookieKey)
	if username == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Login Failed"})
	} else {
		// TODO:messageを修正する
		c.JSON(http.StatusOK, gin.H{"message": "Login successful", "username": username})
	}
}

func loginHandler(c *gin.Context) {
	var user domain.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}
	userExists, err := usecase.LoginUser(user.Username, user.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "User not found"})
	}
	if userExists {
		cookieKey := os.Getenv("LOGIN_USER_ID_KEY")
		infra.NewSession(c, cookieKey, user.Username)
		c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Login Failed"})
	}
}

func logoutHandler(c *gin.Context) {
	cookieKey := os.Getenv("LOGIN_USER_ID_KEY")
	infra.DeleteSession(c, cookieKey)
	c.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
}

func registerUserHandler(c *gin.Context) {
	var user domain.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}
	if err := usecase.RegisterUser(user.Username, user.Password); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
		return
	}
	cookieKey := os.Getenv("LOGIN_USER_ID_KEY")
	infra.NewSession(c, cookieKey, user.Username)
	c.JSON(http.StatusOK, gin.H{"message": "Register successful"})
}

func registerLikedPhotosHandler(c *gin.Context) {
	var likedPhotosArray []domain.LikedPhoto
	if err := c.BindJSON(&likedPhotosArray); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}
	username := infra.GetSession(c, os.Getenv("LOGIN_USER_ID_KEY")).(string)
	if username == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Session expired"})
		return
	}
	if err := usecase.RegisterLikedPhotos(likedPhotosArray, username); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register liked photos!!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Register LikedPhotos Successful"})
}

func selectLikedPhotoHandler(c *gin.Context) {
	cookieKey := os.Getenv("LOGIN_USER_ID_KEY")
	username := infra.GetSession(c, cookieKey).(string)
	if username == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Session expired"})
		return
	}
	LikedPhotoArray, err := usecase.SelectLikedPhotos(username)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cannot get likedPhotos"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Successful", "photo": LikedPhotoArray})
}

func userInfoHandler(c *gin.Context) {
	cookieKey := os.Getenv("LOGIN_USER_ID_KEY")
	username := infra.GetSession(c, cookieKey)
	if username == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Session expired"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Get UserInfo Successful", "username": username})
}
