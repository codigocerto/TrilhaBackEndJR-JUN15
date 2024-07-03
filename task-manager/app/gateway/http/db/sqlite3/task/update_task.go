package task

import (
	"context"
	"fmt"
	"task-manager/app/domain/entities/tasks"
)

const _updateTaskQuery = `
	UPDATE 
		tasks
	SET 
		title = ?, content = ?, date_limit = ?, done = ?, updated_at = CURRENT_TIMESTAMP, updated_by = ?
	WHERE 
		public_id = ?
`

func (r *TaskRepository) UpdateTask(ctx context.Context, task tasks.Task) error {
	const (
		operation = "TaskRepository.UpdateTask"
		updatedBy = "791e7f30-3943-11ef-9a62-abee85e90036"
	)

	// Check if task exists
	var taskExists int
	if err := r.db.QueryRowContext(ctx, _checkTaskExistsQuery, task.PublicID).Scan(&taskExists); err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	if taskExists == 0 {
		return fmt.Errorf("%s: %w", operation, tasks.ErrTaskNotFound)
	}

	if _, err := r.db.ExecContext(
		ctx, _updateTaskQuery,
		task.Title,
		task.Content,
		task.DateLimit,
		task.Done,
		task.PublicID,
		updatedBy,
	); err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	return nil
}
