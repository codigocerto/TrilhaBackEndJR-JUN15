package task

import (
	"fmt"
	"net/http"
	"task-manager/app/domain/usecases"
	"task-manager/app/gateway/http/rest/requests"
	"task-manager/app/gateway/http/rest/responses"
	"task-manager/app/gateway/http/task/schema"
	"time"
)

func (h *Handler) CreateTask(r *http.Request) responses.Response {
	const operation = "TaskHandler.CreateTask"

	// Decode request body
	var req schema.CreateTaskRequest
	if err := requests.DecodeBodyJSON(r, &req); err != nil {
		responses.BadRequest(fmt.Errorf("%s: %w", operation, err))
	}

	// Validate request
	if req.Title == "" || req.DateLimit == "" {
		responses.BadRequest(fmt.Errorf("%s: %w", operation, fmt.Errorf("fields are required")))
	}

	// Convert date limit to time.Time
	dateLimit, err := time.Parse("2006-01-02", req.DateLimit)
	if err != nil {
		responses.BadRequest(fmt.Errorf("%s: %w", operation, err))
	}

	input := usecases.CreateTaskInput{
		Title:     req.Title,
		Content:   req.Content,
		DateLimit: dateLimit,
	}

	// Create task
	if err := h.usecase.CreateTask(r.Context(), input); err != nil {
		responses.InternalServerError(fmt.Errorf("%s: %w", operation, err))
	}

	return responses.Created(nil)
}
