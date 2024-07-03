package tasks

import (
	"context"
	"fmt"
	"task-manager/app/domain/entities/tasks"
	"task-manager/app/domain/usecases"
)

func (u Usecase) UpdateTask(ctx context.Context, input usecases.UpdateTaskInput) error {
	const operation = "TaskUsecase.UpdateTask"

	task := tasks.Task{
		PublicID:  input.PublicID,
		Title:     input.Title,
		Content:   input.Content,
		DateLimit: input.DateLimit,
		Done:      input.Done,
	}

	if err := u.repository.UpdateTask(ctx, task); err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	return nil
}
