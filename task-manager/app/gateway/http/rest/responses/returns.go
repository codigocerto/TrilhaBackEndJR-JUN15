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
		Status: http.StatusBadRequest,
		Error:  err,
	}
}

func InternalServerError(err error) Response {
	return Response{
		Status: http.StatusInternalServerError,
		Error:  err,
	}
}

func NotFound(err error) Response {
	return Response{
		Status: http.StatusNotFound,
		Error:  err,
	}
}

func Conflict(err error) Response {
	return Response{
		Status: http.StatusConflict,
		Error:  err,
	}
}
