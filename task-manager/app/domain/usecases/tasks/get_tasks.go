package tasks

import (
	"context"
	"fmt"
	"task-manager/app/domain/entities/tasks"
)

func (u Usecase) GetTasks(ctx context.Context) ([]tasks.Task, error) {
	const operation = "TaskUsecase.GetTasks"

	tasks, err := u.repository.GetTasks(ctx)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", operation, err)
	}

	return tasks, nil
}
