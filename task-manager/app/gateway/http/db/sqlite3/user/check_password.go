package user

import (
	"context"

	"github.com/google/uuid"
)

func (r *UserRepository) CheckPassword(ctx context.Context, userID uuid.UUID, password string) error {
	const operation = "UserRepository.CheckPassword"

	return nil
}
