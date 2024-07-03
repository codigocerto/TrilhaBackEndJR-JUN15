package usecases

import (
	"context"
	"task-manager/app/domain/entities/tasks"
	"time"

	"github.com/google/uuid"
)

type TaskUsecase interface {
	CreateTask(ctx context.Context, input CreateTaskInput) error
	DeleteTask(ctx context.Context, taskID uuid.UUID) error
	GetTask(ctx context.Context, taskID uuid.UUID) (tasks.Task, error)
	UpdateTask(ctx context.Context, input UpdateTaskInput) error
}

type CreateTaskInput struct {
	Title     string
	Content   string
	DateLimit time.Time
	CreatedBy uuid.UUID
}

type UpdateTaskInput struct {
	PublicID  uuid.UUID
	Title     string
	Content   string
	DateLimit time.Time
	Done      bool
}
