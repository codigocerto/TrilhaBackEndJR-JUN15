package usecases

import "context"

type UserUsecase interface {
	CreateUser(ctx context.Context, input CreateUserInput) error
}

type CreateUserInput struct {
	Name     string
	Email    string
	Password string
}
