package tasks

import (
	"time"

	"github.com/google/uuid"
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
