package user

import (
	"fmt"
	"net/http"
	"task-manager/app/domain/usecases"
	"task-manager/app/gateway/http/rest/requests"
	"task-manager/app/gateway/http/rest/responses"
	"task-manager/app/gateway/http/user/schema"
)

// Login creates a new login to access the system.
// @Summary Create a new login to access the system.
// @Description Create a new login to access the system.
// @Tags Users
// @Param Body body schema.Login true "Body"
// @Success 200 {object} string "Login created successfully"
// @Failure 400 {object} string "Invalid request body"
// @Failure 401 {object} string "Invalid email or password"
// @Failure 500 {object} string "Internal server error"
// @Header 200 {string} Authorization "Bearer token"
// @Router /api/v1/task-manager/login [post]
func (h Handler) Login(r *http.Request) responses.Response {
	const operation = "UserHandler.Login"

	// Parse request
	var req schema.Login
	if err := requests.DecodeBodyJSON(r, &req); err != nil {
		return responses.BadRequest(fmt.Errorf("%s: %w", operation, err))
	}

	// Validate params request
	if req.Email == "" || req.Password == "" {
		return responses.BadRequest(fmt.Errorf("%s: %w", operation, requests.ErrMissingParams))
	}

	input := usecases.LoginInput{
		Email:    req.Email,
		Password: req.Password,
	}

	// Call usecase
	token, err := h.usecase.Login(r.Context(), input)
	if err != nil {
		return responses.InternalServerError(fmt.Errorf("%s: %w", operation, err))
	}

	header := http.Header{
		"Authorization": []string{"Bearer " + token},
	}

	return responses.OK(header, nil)
}
