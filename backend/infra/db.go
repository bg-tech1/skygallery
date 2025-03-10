package infra

import (
	"fmt"
	"log"
	"os"
	"skygallery/domain"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DbConnection struct {
	DB *gorm.DB
}

var dc DbConnection

func init() {
	var err error
	var dsn string
	if os.Getenv("APP_ENV") == "local" {
		dsn = fmt.Sprintf(
			"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
			os.Getenv("POSTGRES_LOCAL_HOSTNAME"),
			os.Getenv("DB_PORT"),
			os.Getenv("POSTGRES_LOCAL_USER"),
			os.Getenv("POSTGRES_LOCAL_PASSWORD"),
			os.Getenv("POSTGRES_LOCAL_DB"),
		)
	} else {
		dsn = fmt.Sprintf(
			"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
			os.Getenv("POSTGRES_HOSTNAME"),
			os.Getenv("DB_PORT"),
			os.Getenv("POSTGRES_USER"),
			os.Getenv("POSTGRES_PASSWORD"),
			os.Getenv("POSTGRES_DB"),
		)
	}

	dc.DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
		return
	}

	// テーブルを自動マイグレーション
	err = dc.DB.AutoMigrate(&domain.User{}, &domain.LikedPhoto{})
	if err != nil {
		log.Fatalf("Migration failed: %v", err)
		return
	}
	fmt.Println("Initializing database successful")
}
