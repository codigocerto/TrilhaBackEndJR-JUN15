package main

import (
	"database/sql"
	"fmt"
	"task-manager/app/config"
	"task-manager/app/gateway/http"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/sqlite3"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		panic(err)
	}

	// Open database connection
	db, err := sql.Open(cfg.DB.Driver, cfg.DB.DSN)
	if err != nil {
		panic(err)
	}

	defer db.Close()

	// Configure driver migration
	driver, err := sqlite3.WithInstance(db, &sqlite3.Config{})
	if err != nil {
		panic(err)
	}

	fmt.Println(cfg.Migration.SourceURL)

	// Create a new migration instance
	m, err := migrate.NewWithDatabaseInstance(
		cfg.Migration.SourceURL,
		cfg.DB.Driver,
		driver,
	)
	if err != nil {
		panic(err)
	}

	// Run migration
	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		panic(err)
	}

	fmt.Println("Migration completed")

	// Start HTTP server
	httpSrv, err := http.NewServer(cfg, db)
	if err != nil {
		panic(err)
	}

	if err := httpSrv.ListenAndServe(); err != nil {
		panic(err)
	}

}
