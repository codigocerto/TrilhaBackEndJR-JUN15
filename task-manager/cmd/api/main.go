package main

import (
	"task-manager/app/config"
	"task-manager/app/gateway/http"
)

func main() {
	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		panic(err)
	}

	// Start HTTP server
	httpSrv, err := http.NewServer(*cfg)
	if err != nil {
		panic(err)
	}

	if err := httpSrv.ListenAndServe(); err != nil {
		panic(err)
	}

}
