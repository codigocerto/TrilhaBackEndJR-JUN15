package schema

type CreateTaskRequest struct {
	Title     string `json:"title"`
	Content   string `json:"content"`
	DateLimit string `json:"date_limit"`
}
