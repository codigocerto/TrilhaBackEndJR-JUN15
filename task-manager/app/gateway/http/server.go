package http

import (
	"database/sql"
	"net/http"
	"task-manager/app/config"

	_ "github.com/mattn/go-sqlite3"
)

func NewServer(cfg config.Config, sql *sql.DB) (*http.Server, error) {
	handler, err := newHandler(sql)
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
