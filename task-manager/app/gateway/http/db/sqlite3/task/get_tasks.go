package task

import (
	"context"
	"fmt"
	"task-manager/app/domain/entities/tasks"
)

const _getTasksQuery = `
SELECT
	public_id,
	title,
	description,
	status,
	date_limit,
	created_at,
	updated_at,
	created_by,
	updated_by
FROM
	tasks
`

func (r *TaskRepository) GetTasks(ctx context.Context) ([]tasks.Task, error) {
	const operation = "TaskRepository.GetTasks"

	rows, err := r.db.QueryContext(ctx, _getTasksQuery)
	if err != nil {
		return nil, fmt.Errorf("%s: %w", operation, err)
	}
	defer rows.Close()

	var t []tasks.Task
	for rows.Next() {
		var task tasks.Task
		err := rows.Scan(
			&task.PublicID,
			&task.Title,
			&task.Content,
			&task.Done,
			&task.DateLimit,
			&task.CreatedAt,
			&task.UpdatedAt,
			&task.CreatedBy,
			&task.UpdatedBy,
		)
		if err != nil {
			return nil, fmt.Errorf("%s: %w", operation, err)
		}

		t = append(t, task)
	}

	return t, nil
}
