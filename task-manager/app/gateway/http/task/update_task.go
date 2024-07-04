package task

import (
	"log"
	"net/http"
	"task-manager/app/domain/usecases"
	"task-manager/app/gateway/http/rest/requests"
	"task-manager/app/gateway/http/rest/responses"
	"task-manager/app/gateway/http/task/schema"
)

// UpdateTask updates a task.
// @Summary Update a task.
// @Description Update a task.
// @Tags Tasks
// @Security BearerToken
// @Success 200 "Success"
// @Failure 400 {object} responses.BadRequestError "Bad request"
// @Failure 404 {object} responses.NotFoundError "Not Found"
// @Failure 401 {object} responses.UnauthorizedError "Not authorized"
// @Failure 500 {object} responses.InternalServerErr "Internal server error"
// @Router /api/v1/task-manager/tasks/{task-id} [put]
// @Param task-id path string true "Task ID"
func (h Handler) UpdateTask(r *http.Request) responses.Response {
	const operation = "TaskHandler.UpdateTask"

	// Parse task ID
	taskID, err := requests.ParseUUID(r, "task-id")
	if err != nil {
		log.Printf("%s: %v", operation, err)

		return responses.BadRequest(err)
	}

	// Parse request body
	var req schema.UpdateTaskRequest
	if err := requests.DecodeBodyJSON(r, &req); err != nil {
		log.Printf("%s: %v", operation, err)

		return responses.BadRequest(err)
	}

	// Validate request
	if req.Title == "" {
		log.Printf("%s: %s", operation, requests.ErrFieldsRequired)

		return responses.BadRequest(requests.ErrFieldsRequired)
	}

	input := usecases.UpdateTaskInput{
		PublicID:  taskID,
		Title:     req.Title,
		Content:   req.Content,
		DateLimit: req.DateLimit,
		Done:      req.Done,
	}

	// Update task
	if err := h.usecase.UpdateTask(r.Context(), input); err != nil {
		log.Printf("%s: %v", operation, err)

		return responses.InternalServerError(err)
	}

	return responses.OK(nil, nil)
}
