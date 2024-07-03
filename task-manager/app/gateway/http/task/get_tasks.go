package task

import (
	"fmt"
	"net/http"
	"task-manager/app/gateway/http/rest/responses"
)

func (h Handler) GetTasks(r *http.Request) responses.Response {
	const operation = "HandlerTasks.GetTasks"

	tasks, err := h.usecase.GetTasks(r.Context())
	if err != nil {
		return responses.InternalServerError(fmt.Errorf("%s: %w", operation, err))
	}

	return responses.OK(nil, tasks)
}
