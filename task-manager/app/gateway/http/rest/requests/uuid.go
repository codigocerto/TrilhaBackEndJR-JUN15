package requests

import (
	"context"
	"errors"
	"net/http"
	"task-manager/app/gateway/http/rest/responses"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

var ErrInvalidUUID = errors.New("invalid uuid")

func ParseUUID(r *http.Request, param string) (uuid.UUID, error) {
	id, err := uuid.Parse(chi.URLParam(r, param))
	if err != nil {
		return uuid.UUID{}, responses.ValidationError{
			Param: "path." + param,
			Err:   ErrInvalidUUID,
		}
	}

	return id, nil
}

func IsValidUUID(ctx context.Context, id string) error {
	_, err := uuid.Parse(id)
	if err != nil {
		return ErrInvalidUUID
	}

	return nil
}
