package task

import (
	"errors"
	"fmt"
	"net/http"
	"task-manager/app/domain/entities/tasks"
	"task-manager/app/gateway/http/rest/requests"
	"task-manager/app/gateway/http/rest/responses"
)

// DeleteTask deletes a task.
// @Summary Delete a task.
// @Description Delete a task.
// @Tags Tasks
// @Security BearerToken
// @Success 200 {object} string "Task deleted successfully"
// @Failure 400 {object} string "Invalid request body"
// @Failure 404 {object} string "Task not found"
// @Failure 401 {object} string "Not authorized"
// @Failure 500 {object} string "Internal server error"
// @Router /api/v1/task-manager/tasks/{task-id} [delete]
// @Param task-id path string true "Task ID"
func (h *Handler) DeleteTask(r *http.Request) responses.Response {
	const operation = "TaskHandler.DeleteTask"

	taskID, err := requests.ParseUUID(r, "task-id")
	if err != nil {
		return responses.BadRequest(fmt.Errorf("%s: %w", operation, err))
	}

	if err := h.usecase.DeleteTask(r.Context(), taskID); err != nil {
		if errors.Is(err, tasks.ErrTaskNotFound) {
			return responses.NotFound(fmt.Errorf("%s: %w", operation, err))
		}

		return responses.InternalServerError(fmt.Errorf("%s: %w", operation, err))
	}

	return responses.OK(nil, nil)
}
