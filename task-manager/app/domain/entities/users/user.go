package users

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	// ErrUserAlreadyExists is returned when the user already exists
	ErrUserAlreadyExists = errors.New("user already exists")

	// ErrUserNotFound is returned when the user is not found
	ErrUserNotFound = errors.New("user not found")

	// ErrInvalidPassword is returned when the password is invalid
	ErrInvalidPassword = errors.New("invalid password")
)

type User struct {
	PublicID uuid.UUID
	Name     string
	Email    string
	Password string
	Created  time.Time
}
