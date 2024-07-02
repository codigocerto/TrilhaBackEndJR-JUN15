package requests

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"task-manager/app/gateway/http/rest/responses"
)

var ErrInvalidBodyJSON = errors.New("invalid body JSON")

type validator interface {
	Validate() error
}

func DecodeBodyJSON(r *http.Request, dest interface{}) error {
	if err := json.NewDecoder(r.Body).Decode(dest); err != nil {
		return responses.ValidationError{
			Param: "body",
			Err:   ErrInvalidBodyJSON,
		}
	}

	v, ok := dest.(validator)
	if !ok {
		return nil
	}

	if err := v.Validate(); err != nil {
		return fmt.Errorf("failed to validate body: %w", err)
	}

	return nil
}
