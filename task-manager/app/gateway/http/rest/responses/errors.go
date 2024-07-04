package responses

import "fmt"

var (
	ErrNotFound            = NotFoundError{Title: "Not found"}
	ErrBadRequest          = BadRequestError{Title: "Bad request"}
	ErrUnauthorized        = UnauthorizedError{Title: "Unauthorized"}
	ErrInternalServerError = InternalServerErr{Title: "Internal server error"}
	ErrConflict            = ConflictError{Title: "Conflict"}
)

type NotFoundError struct {
	Title string `json:"title" example:"Not found"`
}

type BadRequestError struct {
	Title string `json:"title" example:"Bad request"`
}

type UnauthorizedError struct {
	Title string `json:"title" example:"Unauthorized"`
}

type InternalServerErr struct {
	Title string `json:"title" example:"Internal server error"`
}

type ConflictError struct {
	Title string `json:"title" example:"Conflict"`
}

type ValidationError struct {
	Param string
	Err   error
}

func (e ValidationError) Error() string {
	return fmt.Sprintf("%s: %v", e.Param, e.Err.Error())
}
