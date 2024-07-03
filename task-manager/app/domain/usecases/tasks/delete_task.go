package tasks

import (
	"context"
	"fmt"

	"github.com/google/uuid"
)

func (u Usecase) DeleteTask(ctx context.Context, taskID uuid.UUID) error {
	const operation = "TaskUsecase.DeleteTask"

	if err := u.repository.DeleteTask(ctx, taskID); err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	return nil
}
