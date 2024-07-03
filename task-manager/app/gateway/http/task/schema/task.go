package schema

import (
	"task-manager/app/domain/entities/tasks"
	"time"

	"github.com/google/uuid"
)

type CreateTaskRequest struct {
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	DateLimit time.Time `json:"date_limit"`
}

type UpdateTaskRequest struct {
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	DateLimit time.Time `json:"date_limit"`
	Done      bool      `json:"done"`
}

type TaskResponse struct {
	PublicID  uuid.UUID `json:"public_id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	Done      bool      `json:"done"`
	DateLimit time.Time `json:"date_limit"`
	CreatedBy uuid.UUID `json:"created_by"`
	UpdatedBy uuid.UUID `json:"updated_by"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func MapToTaskResponse(task tasks.Task) TaskResponse {
	return TaskResponse{
		PublicID:  task.PublicID,
		Title:     task.Title,
		Content:   task.Content,
		Done:      task.Done,
		DateLimit: task.DateLimit,
		CreatedBy: task.CreatedBy,
		UpdatedBy: task.UpdatedBy,
		CreatedAt: task.CreatedAt,
		UpdatedAt: task.UpdatedAt,
	}
}
