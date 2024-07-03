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

// CreateUser creates a new login to access the system.
// @Summary Create a new login to access the system.
// @Description Create a new login to access the system.
// @Tags Users
// @Param Body body schema.CreateUserRequest true "Body"
// @Success 200 {object} string "User created successfully"
// @Failure 400 {object} string "Invalid request body"
// @Failure 401 {object} string "Not authorized"
// @Failure 500 {object} string "Internal server error"
// @Router /api/v1/task-manager [post]
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
