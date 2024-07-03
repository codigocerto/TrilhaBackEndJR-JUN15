package users

import (
	"context"
	"fmt"
	"task-manager/app/domain/entities/users"
	"task-manager/app/domain/usecases"

	"golang.org/x/crypto/bcrypt"
)

func (u Usecase) CreateUser(ctx context.Context, input usecases.CreateUserInput) error {
	const operation = "UserUsecase.CreateUser"

	// Hash password with bcrypt
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	user := users.User{
		Name:     input.Name,
		Email:    input.Email,
		Password: string(hashedPassword),
	}

	if err := u.repository.CreateUser(ctx, user); err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	return nil
}
