package config

import (
	"time"

	"github.com/kelseyhightower/envconfig"
)

type Config struct {
	HTTP HTTPConfig
}

type HTTPConfig struct {
	Address      string        `envconfig:"HTTP_ADDRESS" default:":3000"`
	ReadTimeout  time.Duration `envconfig:"HTTP_READ_TIMEOUT" default:"5s"`
	WriteTimeout time.Duration `envconfig:"HTTP_WRITE_TIMEOUT" default:"10s"`
}

type DBConfig struct {
	Host     string `envconfig:"DB_HOST" default:"localhost"`
	Port     int    `envconfig:"DB_PORT" default:"5432"`
	User     string `envconfig:"DB_USER" default:"testsql"`
	Password string `envconfig:"DB_PASSWORD" default:"testsql"`
	Database string `envconfig:"DB_DATABASE" default:"testsql"`
}

func LoadConfig() (*Config, error) {
	var cfg Config

	noPrefix := ""

	if err := envconfig.Process(noPrefix, &cfg); err != nil {
		return nil, err
	}

	return &cfg, nil
}
