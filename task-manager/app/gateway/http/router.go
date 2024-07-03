package http

import (
	"database/sql"
	"net/http"
	taskUsecase "task-manager/app/domain/usecases/tasks"
	userUsecase "task-manager/app/domain/usecases/users"
	taskRepo "task-manager/app/gateway/http/db/sqlite3/task"
	userRepo "task-manager/app/gateway/http/db/sqlite3/user"
	"task-manager/app/gateway/http/rest"
	taskHandler "task-manager/app/gateway/http/task"
	userHandler "task-manager/app/gateway/http/user"

	"github.com/go-chi/chi/v5"
)

func newHandler(db *sql.DB) (http.Handler, error) {
	r := chi.NewRouter()

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	userRepo := userRepo.NewUserRepository(db)
	userUsecase := userUsecase.NewUsecase(userRepo)
	userHandler := userHandler.NewHandler(userUsecase)

	taskRepo := taskRepo.NewTaskRepository(db)
	taskUsecase := taskUsecase.NewUsecase(taskRepo)
	taskHandler := taskHandler.NewHandler(taskUsecase)

	r.Route("/api/v1/task-manager", func(r chi.Router) {
		r.Post("/", rest.Handle(userHandler.CreateUser))
		r.Post("/login", rest.Handle(userHandler.Login))

		r.Route("/tasks", func(r chi.Router) {
			r.Post("/", rest.Handle(taskHandler.CreateTask))
			r.Delete("/{task-id}", rest.Handle(taskHandler.DeleteTask))
			r.Get("/{task-id}", rest.Handle(taskHandler.GetTask))
		})
	})

	return r, nil
}
