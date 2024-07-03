package task

import (
	"fmt"
	"net/http"
	"task-manager/app/domain/entities/tasks"
	"task-manager/app/gateway/http/rest/requests"
	"task-manager/app/gateway/http/rest/responses"
	"task-manager/app/gateway/http/task/schema"
)

// GetTask gets a task by ID.
// @Summary Get a task by ID.
// @Description Get a task by ID.
// @Tags Tasks
// @Security BearerToken
// @Success 200 "Success"
// @Failure 400 {object} string "Invalid request body"
// @Failure 404 {object} responses.NotFoundError "Not Found"
// @Failure 401 {object} string "Not authorized"
// @Failure 500 {object} string "Internal server error"
// @Router /api/v1/task-manager/tasks/{task-id} [get]
// @Param task-id path string true "Task ID"
func (h *Handler) GetTask(r *http.Request) responses.Response {
	const operation = "TaskHandler.GetTask"

	// Parse task ID
	taskID, err := requests.ParseUUID(r, "task-id")
	if err != nil {
		return responses.BadRequest(fmt.Errorf("%s: %w", operation, err))
	}

	// Get task
	task, err := h.usecase.GetTask(r.Context(), taskID)
	if err != nil {
		if err == tasks.ErrTaskNotFound {
			return responses.NotFound(fmt.Errorf("%s: %w", operation, err))
		}

		return responses.InternalServerError(fmt.Errorf("%s: %w", operation, err))
	}

	return responses.OK(nil, schema.MapToTaskResponse(task))
}
