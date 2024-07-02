package user

import (
	"fmt"
	"net/http"
	"task-manager/app/domain/usecases"
	"task-manager/app/gateway/http/rest/requests"
	"task-manager/app/gateway/http/rest/responses"
	"task-manager/app/gateway/http/user/schema"

	"golang.org/x/crypto/bcrypt"
)

func (h Handler) CreateUser(r *http.Request) responses.Response {
	const operation = "UserHandler.CreateUser"

	// Decode request body
	var req schema.CreateUserRequest
	if err := requests.DecodeBodyJSON(r, &req); err != nil {
		return responses.BadRequest(fmt.Errorf("%s: %w", operation, err))
	}

	// Validate request
	if req.Name == "" || req.Email == "" || req.Password == "" {
		return responses.BadRequest(fmt.Errorf("%s: %w", operation, fmt.Errorf("fields are required")))
	}

	// Hash password with bcrypt
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return responses.InternalServerError(fmt.Errorf("%s: %w", operation, err))
	}

	input := usecases.CreateUserInput{
		Name:     req.Name,
		Email:    req.Email,
		Password: string(hashedPassword),
	}

	// Create user
	if err := h.usecase.CreateUser(r.Context(), input); err != nil {
		return responses.InternalServerError(fmt.Errorf("%s: %w", operation, err))
	}

	return responses.Created(nil)
}
