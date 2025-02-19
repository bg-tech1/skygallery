package infra

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"io"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

const SessionTimeout = 30 * time.Minute

var conn *redis.Client

func init() {
	conn = redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_HOSTNAME"),
		Password: "",
		DB:       0,
	})
}

func NewSession(c *gin.Context, cookieKey, redisValue string) {
	b := make([]byte, 64)
	if _, err := io.ReadFull(rand.Reader, b); err != nil {
		panic("ランダムな文字作成時にエラーが発生しました。")
	}

	newRedisKey := base64.URLEncoding.EncodeToString(b)
	if err := conn.Set(c, newRedisKey, redisValue, SessionTimeout).Err(); err != nil {
		panic("Session登録時にエラーが発生:" + err.Error() + "hostname:" + os.Getenv("REDIS_HOSTNAME"))
	}
	c.SetCookie(cookieKey, newRedisKey, int(SessionTimeout.Seconds()), "/", "", true, false)
}

func GetSession(c *gin.Context, cookieKey string) interface{} {
	redisKey, err := c.Cookie(cookieKey)
	if err != nil {
		fmt.Println("Cookieの取得に失敗しました")
		return nil
	}
	redisValue, err := conn.Get(c, redisKey).Result()
	switch {
	case err == redis.Nil:
		fmt.Println("SessionKeyが登録されていません。")
		return nil
	case err != nil:
		fmt.Println("Session取得時にエラー発生:" + err.Error())
		return nil
	}
	conn.Expire(c, redisKey, SessionTimeout)

	c.SetCookie(cookieKey, redisKey, int(SessionTimeout.Seconds()), "/", "", true, true)

	return redisValue
}

func DeleteSession(c *gin.Context, cookieKey string) {
	redisId, _ := c.Cookie(cookieKey)
	conn.Del(c, redisId)
	c.SetCookie(cookieKey, "", -1, "/", "", false, false)
}
