package main

import (
	"fmt"
	"os"
	"skygallery/interface/handler"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// デバック用
	fmt.Println("listening to port 8080", os.Getenv("REACT_APP_API_BASE_URL"))
	r := gin.Default()
	// CORS設定
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("REACT_APP_API_BASE_URL")}, // 許可するオリジン
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))
	// ルート設定
	handler.SetupRoutes(r)

	r.Run(":8080") // サーバー起動

}
