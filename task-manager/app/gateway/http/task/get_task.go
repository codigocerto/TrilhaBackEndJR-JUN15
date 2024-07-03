package task

import (
	"fmt"
	"net/http"
	"task-manager/app/gateway/http/rest/requests"
	"task-manager/app/gateway/http/rest/responses"
	"task-manager/app/gateway/http/task/schema"
)

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
		return responses.InternalServerError(fmt.Errorf("%s: %w", operation, err))
	}

	return responses.OK(nil, schema.MapToTaskResponse(task))
}
