package users

import (
	"context"

	"github.com/google/uuid"
)

type UserRepository interface {
	CreateUser(ctx context.Context, user User) error
	FindByEmail(ctx context.Context, email string) (User, error)
	CheckPassword(ctx context.Context, userID uuid.UUID, password string) error
}
