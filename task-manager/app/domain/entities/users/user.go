package users

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	Public   uuid.UUID
	Name     string
	Email    string
	Password string
	Created  time.Time
}
