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
	const (
		operation = "TaskRepository.CreateTask"
		createdBy = "791e7f30-3943-11ef-9a62-abee85e90036"
	)
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
		createdBy,
		createdBy,
	)
	if err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	return nil
}
