package users

import (
	"context"
	"task-manager/app/domain/usecases"
)

func (u Usecase) Login(ctx context.Context, input usecases.LoginInput) (string, error) {
	const operation = "UserUsecase.Login"

	// Find user by email
	user, err := u.repository.FindByEmail(ctx, input.Email)
	if err != nil {
		return "", err
	}

	// Check password
	if err := u.repository.CheckPassword(ctx, user.PublicID, user.Password); err != nil {
		return "", err
	}

	return "", nil
}
