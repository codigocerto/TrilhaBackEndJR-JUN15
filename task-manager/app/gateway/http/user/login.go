package user

import (
	"log"
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
// @Success 200 "Success"
// @Failure 400 {object} responses.BadRequestError "Bad request"
// @Failure 401 {object} responses.UnauthorizedError "Not authorized"
// @Failure 500 {object} responses.InternalServerErr "Internal server error"
// @Router /api/v1/task-manager/login [post]
func (h Handler) Login(r *http.Request) responses.Response {
	const operation = "UserHandler.Login"

	// Parse request
	var req schema.Login
	if err := requests.DecodeBodyJSON(r, &req); err != nil {
		log.Printf("%s: %v", operation, err)

		return responses.BadRequest(err)
	}

	// Validate params request
	if req.Email == "" || req.Password == "" {
		log.Printf("%s: %v", operation, requests.ErrFieldsRequired)

		return responses.BadRequest(requests.ErrFieldsRequired)
	}

	input := usecases.LoginInput{
		Email:    req.Email,
		Password: req.Password,
	}

	// Call usecase
	token, err := h.usecase.Login(r.Context(), input)
	if err != nil {
		log.Printf("%s: %v", operation, err)

		return responses.InternalServerError(err)
	}

	header := http.Header{
		"Authorization": []string{"Bearer " + token},
	}

	return responses.OK(header, nil)
}
