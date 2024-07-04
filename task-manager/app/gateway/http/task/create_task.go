package task

import (
	"log"
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
// @Success 200 "Success"
// @Failure 400 {object} responses.BadRequestError "Bad request"
// @Failure 401 {object} responses.UnauthorizedError "Not authorized"
// @Failure 500 {object} responses.InternalServerErr "Internal server error"
// @Router /api/v1/task-manager/tasks [post]
func (h *Handler) CreateTask(r *http.Request) responses.Response {
	const operation = "TaskHandler.CreateTask"

	// Decode request body
	var req schema.CreateTaskRequest
	if err := requests.DecodeBodyJSON(r, &req); err != nil {
		log.Printf("%s: %v", operation, err)

		responses.BadRequest(err)
	}

	// Validate request
	if req.Title == "" {
		log.Printf("%s: %v", operation, requests.ErrFieldsRequired)

		responses.BadRequest(requests.ErrFieldsRequired)
	}

	input := usecases.CreateTaskInput{
		Title:     req.Title,
		Content:   req.Content,
		DateLimit: req.DateLimit,
	}

	// Create task
	if err := h.usecase.CreateTask(r.Context(), input); err != nil {
		log.Printf("%s: %v", operation, err)

		responses.InternalServerError(err)
	}

	return responses.Created(nil)
}
