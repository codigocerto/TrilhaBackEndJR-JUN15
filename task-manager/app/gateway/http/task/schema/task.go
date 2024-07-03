package schema

import "time"

type CreateTaskRequest struct {
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	DateLimit time.Time `json:"date_limit"`
}
