package usecases

import (
	"context"
	"time"

	"github.com/google/uuid"
)

type TaskUsecase interface {
	CreateTask(ctx context.Context, input CreateTaskInput) error
}

type CreateTaskInput struct {
	Title     string
	Content   string
	DateLimit time.Time
	CreatedBy uuid.UUID
}
