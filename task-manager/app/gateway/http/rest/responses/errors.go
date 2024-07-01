package responses

import "fmt"

type ValidationError struct {
	Param string
	Err   error
}

func (e ValidationError) Error() string {
	return fmt.Sprintf("%s: %v", e.Param, e.Err.Error())
}
