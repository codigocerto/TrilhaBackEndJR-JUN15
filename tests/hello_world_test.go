package main

import (
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/andrepreira/shortcut-link-api/api/router/hello"
)

func TestHelloWorldEndpoint(t *testing.T) {
	r := hello.SetupRouter()

	req, _ := http.NewRequest("GET", "/hello", nil)
	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "application/json; charset=utf-8", w.Header().Get("Content-Type"))

	expected := `{"message":"Hello World"}`
	assert.JSONEq(t, expected, w.Body.String())

}
