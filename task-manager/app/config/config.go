package config

import (
	"os"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	HTTP      HTTPConfig
	DB        DBConfig
	Migration Migration
}

type HTTPConfig struct {
	Address      string
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
}

type DBConfig struct {
	Driver string
	DSN    string
}

type Migration struct {
	SourceURL string
}

func LoadConfig() (Config, error) {
	var cfg Config

	if err := godotenv.Load(); err != nil {
		return Config{}, err
	}

	// HTTP configuration
	cfg.HTTP.Address = os.Getenv("HTTP_ADDRESS")
	if cfg.HTTP.Address == "" {
		cfg.HTTP.Address = ":3000"
	}
	cfg.HTTP.ReadTimeout = 5 * time.Second
	cfg.HTTP.WriteTimeout = 10 * time.Second

	// Database configuration
	cfg.DB.Driver = os.Getenv("DB_DRIVER")
	if cfg.DB.Driver == "" {
		cfg.DB.Driver = "sqlite3"
	}
	cfg.DB.DSN = os.Getenv("DB_DSN")
	if cfg.DB.DSN == "" {
		cfg.DB.DSN = "file::memory:?cache=shared"
	}

	// Migration configuration
	cfg.Migration.SourceURL = os.Getenv("MIGRATION_SOURCE_URL")
	if cfg.Migration.SourceURL == "" {
		cfg.Migration.SourceURL = "file://app/gateway/http/db/sqlite3/migrations"
	}

	return cfg, nil
}
