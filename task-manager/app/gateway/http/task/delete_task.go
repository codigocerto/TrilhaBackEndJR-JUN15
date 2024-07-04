package task

import (
	"errors"
	"log"
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
// @Success 200 "Success"
// @Failure 400 {object} responses.BadRequestError "Bad request"
// @Failure 404 {object} responses.NotFoundError "Not Found"
// @Failure 401 {object} responses.UnauthorizedError "Not authorized"
// @Failure 500 {object} responses.InternalServerErr "Internal server error"
// @Router /api/v1/task-manager/tasks/{task-id} [delete]
// @Param task-id path string true "Task ID"
func (h *Handler) DeleteTask(r *http.Request) responses.Response {
	const operation = "TaskHandler.DeleteTask"

	taskID, err := requests.ParseUUID(r, "task-id")
	if err != nil {
		log.Printf("%s: %v", operation, err)

		return responses.BadRequest(err)
	}

	if err := h.usecase.DeleteTask(r.Context(), taskID); err != nil {
		if errors.Is(err, tasks.ErrTaskNotFound) {
			log.Printf("%s: %v", operation, err)

			return responses.NotFound(err)
		}

		log.Printf("%s: %v", operation, err)

		return responses.InternalServerError(err)
	}

	return responses.OK(nil, nil)
}
