package task

import (
	"errors"
	"fmt"
	"net/http"
	"task-manager/app/domain/entities/tasks"
	"task-manager/app/gateway/http/rest/requests"
	"task-manager/app/gateway/http/rest/responses"
)

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
