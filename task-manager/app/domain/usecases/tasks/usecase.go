package tasks

import (
	"task-manager/app/domain/entities/tasks"
	"task-manager/app/domain/usecases"
)

var _ usecases.TaskUsecase = (*Usecase)(nil)

type Usecase struct {
	repository tasks.TaskRepository
}

func NewUsecase(repository tasks.TaskRepository) *Usecase {
	return &Usecase{
		repository: repository,
	}
}
