package task

import (
	"log"
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
// @Failure 400 {object} responses.BadRequestError "Bad request"
// @Failure 404 {object} responses.NotFoundError "Not Found"
// @Failure 401 {object} responses.UnauthorizedError "Not authorized"
// @Failure 500 {object} responses.InternalServerErr "Internal server error"
// @Router /api/v1/task-manager/tasks/{task-id} [get]
// @Param task-id path string true "Task ID"
func (h *Handler) GetTask(r *http.Request) responses.Response {
	const operation = "TaskHandler.GetTask"

	// Parse task ID
	taskID, err := requests.ParseUUID(r, "task-id")
	if err != nil {
		log.Printf("%s: %v", operation, err)

		return responses.BadRequest(err)
	}

	// Get task
	task, err := h.usecase.GetTask(r.Context(), taskID)
	if err != nil {
		if err == tasks.ErrTaskNotFound {
			log.Printf("%s: %v", operation, err)

			return responses.NotFound(err)
		}

		log.Printf("%s: %v", operation, err)
		return responses.InternalServerError(err)
	}

	return responses.OK(nil, schema.MapToTaskResponse(task))
}
