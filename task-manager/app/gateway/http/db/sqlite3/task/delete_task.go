package task

import (
	"context"
	"fmt"
	"task-manager/app/domain/entities/tasks"

	"github.com/google/uuid"
)

const (
	_deleteTaskQuery = `
		DELETE FROM 
			tasks
		WHERE 
			public_id = ?
	`

	_checkTaskExistsQuery = `
		SELECT
			COUNT(*)
		FROM
			tasks
		WHERE
			public_id = ?
	`
)

func (r TaskRepository) DeleteTask(ctx context.Context, taskID uuid.UUID) error {
	const operation = "TaskRepository.DeleteTask"

	// Check if task exists
	var taskExists int
	if err := r.db.QueryRowContext(ctx, _checkTaskExistsQuery, taskID).Scan(&taskExists); err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	if taskExists == 0 {
		return fmt.Errorf("%s: %w", operation, tasks.ErrTaskNotFound)
	}

	if _, err := r.db.ExecContext(ctx, _deleteTaskQuery, taskID); err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	return nil
}
