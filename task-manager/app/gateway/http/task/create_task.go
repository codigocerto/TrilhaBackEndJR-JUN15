package task

import (
	"fmt"
	"net/http"
	"task-manager/app/domain/usecases"
	"task-manager/app/gateway/http/rest/requests"
	"task-manager/app/gateway/http/rest/responses"
	"task-manager/app/gateway/http/task/schema"
)

// CreateTask creates a new login to access the system.
// @Summary Create a new login to access the system.
// @Description Create a new login to access the system.
// @Tags Tasks
// @Security BearerToken
// @Param Body body schema.CreateTaskRequest true "Body"
// @Success 200 {object} string "Task created successfully"
// @Failure 400 {object} string "Invalid request body"
// @Failure 401 {object} string "Not authorized"
// @Failure 500 {object} string "Internal server error"
// @Router /api/v1/task-manager/tasks [post]
func (h *Handler) CreateTask(r *http.Request) responses.Response {
	const operation = "TaskHandler.CreateTask"

	// Decode request body
	var req schema.CreateTaskRequest
	if err := requests.DecodeBodyJSON(r, &req); err != nil {
		responses.BadRequest(fmt.Errorf("%s: %w", operation, err))
	}

	// Validate request
	if req.Title == "" {
		responses.BadRequest(fmt.Errorf("%s: %w", operation, fmt.Errorf("fields are required")))
	}

	input := usecases.CreateTaskInput{
		Title:     req.Title,
		Content:   req.Content,
		DateLimit: req.DateLimit,
	}

	// Create task
	if err := h.usecase.CreateTask(r.Context(), input); err != nil {
		responses.InternalServerError(fmt.Errorf("%s: %w", operation, err))
	}

	return responses.Created(nil)
}
