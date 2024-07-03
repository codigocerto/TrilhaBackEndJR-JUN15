package tasks

import (
	"context"
	"fmt"
	"task-manager/app/domain/entities/tasks"

	"github.com/google/uuid"
)

func (u Usecase) GetTask(ctx context.Context, taskID uuid.UUID) (tasks.Task, error) {
	const operation = "Usecase.GetTask"

	task, err := u.repository.GetTask(ctx, taskID)
	if err != nil {
		return tasks.Task{}, fmt.Errorf("%s: %w", operation, err)
	}

	task.PublicID = taskID

	return task, nil
}
