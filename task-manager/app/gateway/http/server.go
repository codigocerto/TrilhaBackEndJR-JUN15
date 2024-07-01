package http

import (
	"net/http"
	"task-manager/app/config"
)

func NewServer(cfg config.Config) (*http.Server, error) {
	handler, err := newHandler()
	if err != nil {
		return nil, err
	}

	srv := &http.Server{
		Addr:         cfg.HTTP.Address,
		Handler:      handler,
		ReadTimeout:  cfg.HTTP.ReadTimeout,
		WriteTimeout: cfg.HTTP.WriteTimeout,
	}

	return srv, nil
}
