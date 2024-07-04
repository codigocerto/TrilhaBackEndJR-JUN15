package task

import (
	"log"
	"net/http"
	"task-manager/app/gateway/http/rest/responses"
)

// GetTasks gets all tasks.
// @Summary Get all tasks.
// @Description Get all tasks.
// @Tags Tasks
// @Security BearerToken
// @Success 200 {object} []schema.TaskResponse "Tasks found successfully"
// @Failure 400 {object} responses.BadRequestError "Bad request"
// @Failure 401 {object} responses.UnauthorizedError "Not authorized"
// @Failure 500 {object} responses.InternalServerErr "Internal server error"
// @Router /api/v1/task-manager/tasks [get]
func (h Handler) GetTasks(r *http.Request) responses.Response {
	const operation = "HandlerTasks.GetTasks"

	tasks, err := h.usecase.GetTasks(r.Context())
	if err != nil {
		log.Printf("%s: %v", operation, err)

		return responses.InternalServerError(err)
	}

	return responses.OK(nil, tasks)
}
