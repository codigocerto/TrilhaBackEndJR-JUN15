package users

import (
	"context"
	"fmt"
	"task-manager/app/auth"
	"task-manager/app/domain/entities/users"
	"task-manager/app/domain/usecases"

	"golang.org/x/crypto/bcrypt"
)

func (u Usecase) Login(ctx context.Context, input usecases.LoginInput) (string, error) {
	const operation = "UserUsecase.Login"

	// Find user by email
	user, err := u.repository.FindByEmail(ctx, input.Email)
	if err != nil {
		return "", fmt.Errorf("%s: %w", operation, err)
	}

	// Check password
	passwdHashed, err := u.repository.GetPassword(ctx, user.PublicID)
	if err != nil {
		return "", fmt.Errorf("%s: %w", operation, err)
	}

	// Compare password with bcrypt
	if err := bcrypt.CompareHashAndPassword([]byte(passwdHashed), []byte(input.Password)); err != nil {
		return "", fmt.Errorf("%s: %w", operation, users.ErrInvalidPassword)
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
