package rest

import (
	"encoding/json"
	"fmt"
	"net/http"
	"task-manager/app/gateway/http/rest/responses"
)

func Handle(handler func(r *http.Request) responses.Response) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		response := handler(r)

		if response.Error != nil {
			http.Error(w, response.Error.Error(), response.Status)
			return
		}

		if h := response.Header(); h != nil {
			copyHeaders(w, h)
		}

		if err := sendJSON(w, response); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

func sendJSON(w http.ResponseWriter, resp responses.Response) error {
	if resp.Payload == nil {
		w.WriteHeader(resp.Status)
		return nil
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.Status)

	if err := json.NewEncoder(w).Encode(resp.Payload); err != nil {
		return fmt.Errorf("failed to encode response: %w", err)
	}

	return nil
}

func copyHeaders(w http.ResponseWriter, h http.Header) {
	wh := w.Header()

	for key, values := range h {
		for _, value := range values {
			wh.Add(key, value)
		}
	}
}
