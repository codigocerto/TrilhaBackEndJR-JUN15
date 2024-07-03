package responses

import "fmt"

var (
	ErrNotFound = NotFoundError{Title: "Not found"}
)

type NotFoundError struct {
	Title string `json:"title" example:"Not found"`
}

type ValidationError struct {
	Param string
	Err   error
}

func (e ValidationError) Error() string {
	return fmt.Sprintf("%s: %v", e.Param, e.Err.Error())
}
