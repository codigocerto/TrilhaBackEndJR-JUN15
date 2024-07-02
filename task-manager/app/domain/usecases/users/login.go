package users

import (
	"context"
	"fmt"
	"task-manager/app/auth"
	"task-manager/app/domain/usecases"
)

func (u Usecase) Login(ctx context.Context, input usecases.LoginInput) (string, error) {
	const operation = "UserUsecase.Login"

	// Find user by email
	user, err := u.repository.FindByEmail(ctx, input.Email)
	if err != nil {
		return "", fmt.Errorf("%s: %w", operation, err)
	}

	// Check password
	if err := u.repository.CheckPassword(ctx, user.PublicID, input.Password); err != nil {
		return "", fmt.Errorf("%s: %w", operation, err)
	}

	userToken := auth.InputToken{
		PublicID: user.PublicID,
		Name:     user.Name,
		Email:    input.Email,
	}

	// Generate token
	token, err := auth.GenerateToken(ctx, userToken)
	if err != nil {
		return "", fmt.Errorf("%s: %w", operation, err)
	}

	return token, nil
}
