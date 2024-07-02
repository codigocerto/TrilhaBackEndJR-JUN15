package usecases

import "context"

type UserUsecase interface {
	CreateUser(ctx context.Context, input CreateUserInput) error
	Login(ctx context.Context, input LoginInput) (string, error)
}

type CreateUserInput struct {
	Name     string
	Email    string
	Password string
}

type LoginInput struct {
	Email    string
	Password string
}
