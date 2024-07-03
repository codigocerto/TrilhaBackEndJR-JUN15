package user

import (
	"errors"
	"fmt"
	"net/http"
	"task-manager/app/domain/entities/users"
	"task-manager/app/domain/usecases"
	"task-manager/app/gateway/http/rest/requests"
	"task-manager/app/gateway/http/rest/responses"
	"task-manager/app/gateway/http/user/schema"
)

func (h Handler) CreateUser(r *http.Request) responses.Response {
	const operation = "UserHandler.CreateUser"

	// Decode request body
	var req schema.CreateUserRequest
	if err := requests.DecodeBodyJSON(r, &req); err != nil {
		return responses.BadRequest(fmt.Errorf("%s: %w", operation, err))
	}

	// Validate request fileds
	if req.Name == "" || req.Email == "" || req.Password == "" {
		return responses.BadRequest(fmt.Errorf("%s: %w", operation, fmt.Errorf("fields are required")))
	}

	input := usecases.CreateUserInput{
		Name:     req.Name,
		Email:    req.Email,
		Password: req.Password,
	}

	// Create user
	if err := h.usecase.CreateUser(r.Context(), input); err != nil {
		if errors.Is(err, users.ErrUserAlreadyExists) {
			return responses.Conflict(fmt.Errorf("%s: %w", operation, err))
		}

		return responses.InternalServerError(fmt.Errorf("%s: %w", operation, err))
	}

	return responses.Created(nil)
}
