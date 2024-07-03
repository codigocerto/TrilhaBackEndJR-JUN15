package task

import (
	"database/sql"
	"task-manager/app/domain/entities/tasks"
)

var _ tasks.TaskRepository = (*TaskRepository)(nil)

type TaskRepository struct {
	db *sql.DB
}

func NewTaskRepository(db *sql.DB) *TaskRepository {
	return &TaskRepository{
		db: db,
	}
}
