package users

import (
	"context"
	"fmt"
	"task-manager/app/domain/entities/users"
	"task-manager/app/domain/usecases"
)

func (u Usecase) CreateUser(ctx context.Context, input usecases.CreateUserInput) error {
	const operation = "UserUsecase.CreateUser"

	user := users.User{
		Name:     input.Name,
		Email:    input.Email,
		Password: input.Password,
	}

	if err := u.repository.CreateUser(ctx, user); err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	return nil
}
