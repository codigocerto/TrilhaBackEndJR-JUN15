package responses

import "net/http"

func OK(h http.Header, payload interface{}) Response {
	return Response{
		Status:  http.StatusOK,
		header:  h,
		Payload: payload,
	}
}

func Created(payload interface{}) Response {
	return Response{
		Status:  http.StatusCreated,
		Payload: payload,
	}
}

func BadRequest(err error) Response {
	return Response{
		Status:  http.StatusBadRequest,
		Error:   err,
		Payload: ErrBadRequest,
	}
}

func InternalServerError(err error) Response {
	return Response{
		Status:  http.StatusInternalServerError,
		Error:   err,
		Payload: ErrInternalServerError,
	}
}

func NotFound(err error) Response {
	return Response{
		Status:  http.StatusNotFound,
		Error:   err,
		Payload: ErrNotFound,
	}
}

func Conflict(err error) Response {
	return Response{
		Status:  http.StatusConflict,
		Error:   err,
		Payload: ErrConflict,
	}
}
