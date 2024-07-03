package tasks

import (
	"context"
	"fmt"
	"task-manager/app/domain/entities/tasks"
	"task-manager/app/domain/usecases"
)

func (u *Usecase) CreateTask(ctx context.Context, input usecases.CreateTaskInput) error {
	const operation = "TaslUsecase.CreateTask"

	task := tasks.Task{
		Title:     input.Title,
		Content:   input.Content,
		DateLimit: input.DateLimit,
		Done:      false,
	}

	if err := u.repository.CreateTask(ctx, task); err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	return nil
}
