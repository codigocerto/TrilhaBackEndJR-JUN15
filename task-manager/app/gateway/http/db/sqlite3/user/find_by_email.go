package user

import (
	"context"
	"task-manager/app/domain/entities/users"
)

func (r *UserRepository) FindByEmail(ctx context.Context, email string) (users.User, error) {
	const operation = "UserRepository.FindByEmail"

	return users.User{}, nil
}
