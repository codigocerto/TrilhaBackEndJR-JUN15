package tasks

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	// ErrTaskNotFound is used when the task is not found.
	ErrTaskNotFound = errors.New("task not found")
)

type Task struct {
	PublicID  uuid.UUID
	Title     string
	Content   string
	DateLimit time.Time
	Done      bool
	CreatedBy uuid.UUID
	UpdatedBy uuid.UUID
	CreatedAt time.Time
	UpdatedAt time.Time
}
