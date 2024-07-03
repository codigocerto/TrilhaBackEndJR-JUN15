package task

import (
	"context"
	"fmt"
	"task-manager/app/domain/entities/tasks"

	"github.com/google/uuid"
)

const _getTaskQuery = `
SELECT
	title,
	description,
	status,
	created_at,
	updated_at,
	created_by,
	updated_by
FROM
	tasks
WHERE
	public_id = $1
`

func (r *TaskRepository) GetTask(ctx context.Context, taskID uuid.UUID) (tasks.Task, error) {
	const operation = "TaskRepository.GetTask"

	var task tasks.Task

	err := r.db.QueryRowContext(ctx, _getTaskQuery, taskID).Scan(
		&task.Title,
		&task.Content,
		&task.Done,
		&task.CreatedAt,
		&task.UpdatedAt,
		&task.CreatedBy,
		&task.UpdatedBy,
	)
	if err != nil {
		return tasks.Task{}, fmt.Errorf("%s: %w", operation, err)
	}

	return task, nil
}
