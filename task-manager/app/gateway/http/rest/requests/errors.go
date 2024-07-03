package requests

import "errors"

var (
	ErrMissingParams      = errors.New("missing params")
	ErrInvalidBodyRequest = errors.New("invalid body request")
)
