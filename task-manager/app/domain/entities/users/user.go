package users

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	// ErrUserAlreadyExists is returned when the user already exists
	ErrUserAlreadyExists = errors.New("user already exists")
)

type User struct {
	Public   uuid.UUID
	Name     string
	Email    string
	Password string
	Created  time.Time
}
