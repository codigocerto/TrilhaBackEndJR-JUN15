package task

import (
	"context"
	"fmt"

	"github.com/google/uuid"
)

const (
	_deleteTaskQuery = `
		DELETE FROM 
			tasks
		WHERE 
			public_id = ?
	`
)

func (r TaskRepository) DeleteTask(ctx context.Context, taskID uuid.UUID) error {
	const operation = "TaskRepository.DeleteTask"

	if _, err := r.db.ExecContext(ctx, _deleteTaskQuery, taskID); err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	return nil
}
