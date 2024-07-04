package user

import (
	"errors"
	"log"
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
// @Success 200 "Success"
// @Failure 400 {object} responses.BadRequestError "Bad request"
// @Failure 409 {object} responses.ConflictError "Conflict"
// @Failure 500 {object} responses.InternalServerErr "Internal server error"
// @Router /api/v1/task-manager [post]
func (h Handler) CreateUser(r *http.Request) responses.Response {
	const operation = "UserHandler.CreateUser"

	// Decode request body
	var req schema.CreateUserRequest
	if err := requests.DecodeBodyJSON(r, &req); err != nil {
		log.Printf("%s: %v", operation, err)

		return responses.BadRequest(err)
	}

	// Validate request fileds
	if req.Name == "" || req.Email == "" || req.Password == "" {
		log.Printf("%s: %v", operation, requests.ErrFieldsRequired)

		return responses.BadRequest(requests.ErrFieldsRequired)
	}

	input := usecases.CreateUserInput{
		Name:     req.Name,
		Email:    req.Email,
		Password: req.Password,
	}

	// Create user
	if err := h.usecase.CreateUser(r.Context(), input); err != nil {
		if errors.Is(err, users.ErrUserAlreadyExists) {
			log.Printf("%s: %v", operation, err)

			return responses.Conflict(err)
		}

		log.Printf("%s: %v", operation, err)
		return responses.InternalServerError(err)
	}

	return responses.Created(nil)
}
