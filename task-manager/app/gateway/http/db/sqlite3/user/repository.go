package user

import (
	"database/sql"
	"task-manager/app/domain/entities/users"
)

var _ users.UserRepository = (*UserRepository)(nil)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{
		db: db,
	}
}
