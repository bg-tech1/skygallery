package domain

type LikedPhoto struct {
	Username string `gorm:"primaryKey" json:"username"`
	PhotoId  string `gorm:"primaryKey" json:"photoId"`
	Url      string `json:"url"`
	Liked    bool   `json:"liked"`
}
