package task

import (
	"fmt"
	"net/http"
	"task-manager/app/domain/usecases"
	"task-manager/app/gateway/http/rest/requests"
	"task-manager/app/gateway/http/rest/responses"
	"task-manager/app/gateway/http/task/schema"
)

func (h Handler) UpdateTask(r *http.Request) responses.Response {
	const operation = "TaskHandler.UpdateTask"

	// Parse task ID
	taskID, err := requests.ParseUUID(r, "task-id")
	if err != nil {
		return responses.BadRequest(fmt.Errorf("%s: %w", operation, err))
	}

	// Parse request body
	var req schema.UpdateTaskRequest
	if err := requests.DecodeBodyJSON(r, &req); err != nil {
		return responses.BadRequest(fmt.Errorf("%s: %w", operation, err))
	}

	// Validate request
	if req.Title == "" {
		return responses.BadRequest(fmt.Errorf("%s: %w", operation, err))
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
		return responses.InternalServerError(fmt.Errorf("%s: %w", operation, err))
	}

	return responses.OK(nil, nil)
}
