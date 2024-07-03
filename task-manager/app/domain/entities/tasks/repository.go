package tasks

import "context"

type TaskRepository interface {
	CreateTask(ctx context.Context, task Task) error
}
