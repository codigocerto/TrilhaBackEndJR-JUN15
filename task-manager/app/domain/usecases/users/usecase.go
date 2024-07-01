package users

import (
	"task-manager/app/domain/entities/users"
	"task-manager/app/domain/usecases"
)

var _ usecases.UserUsecase = (*Usecase)(nil)

type Usecase struct {
	repository users.UserRepository
}

func NewUsecase(repository users.UserRepository) *Usecase {
	return &Usecase{
		repository: repository,
	}
}
