package responses

import (
	"net/http"
)

type Response struct {
	Status  int
	Error   error
	header  http.Header
	Payload interface{}
}

func (r Response) Header() http.Header {
	return r.header
}
