package responses

import "net/http"

func OK(payload interface{}) Response {
	return Response{
		Status:  http.StatusOK,
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
