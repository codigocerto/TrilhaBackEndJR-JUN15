package user

import (
	"fmt"
	"net/http"
	"task-manager/app/domain/usecases"
	"task-manager/app/gateway/http/rest/requests"
	"task-manager/app/gateway/http/rest/responses"
	"task-manager/app/gateway/http/user/schema"
)

func (h Handler) Login(r *http.Request) responses.Response {
	const operation = "UserHandler.Login"

	// Parse request
	var req schema.Login
	if err := requests.DecodeBodyJSON(r, &req); err != nil {
		return responses.BadRequest(fmt.Errorf("%s: %w", operation, err))
	}

	// Validate params request
	if req.Email == "" || req.Password == "" {
		return responses.BadRequest(fmt.Errorf("%s: %w", operation, "email or password is empty"))
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

	return responses.OK(header)
}
