package task

import (
	"context"
	"fmt"
	"task-manager/app/domain/entities/tasks"

	"github.com/google/uuid"
)

const _createTaskQuery = `
	INSERT INTO tasks (public_id, title, description, status, date_limit, created_by, updated_by)
	VALUES (?, ?, ?, ?, ?, ?, ?)
`

func (r *TaskRepository) CreateTask(ctx context.Context, task tasks.Task) error {
	const operation = "TaskRepository.CreateTask"

	// Generate task public ID
	task.PublicID = uuid.New()

	_, err := r.db.ExecContext(
		ctx,
		_createTaskQuery,
		task.PublicID,
		task.Title,
		task.Content,
		task.Done,
		task.DateLimit,
		task.CreatedBy,
		task.UpdatedBy,
	)
	if err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	return nil
}
