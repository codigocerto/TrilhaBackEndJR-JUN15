package http

import (
	"database/sql"
	"net/http"
	taskUsecase "task-manager/app/domain/usecases/tasks"
	userUsecase "task-manager/app/domain/usecases/users"
	taskRepo "task-manager/app/gateway/http/db/sqlite3/task"
	userRepo "task-manager/app/gateway/http/db/sqlite3/user"
	"task-manager/app/gateway/http/middleware/auth"
	"task-manager/app/gateway/http/rest"
	taskHandler "task-manager/app/gateway/http/task"
	userHandler "task-manager/app/gateway/http/user"

	"github.com/go-chi/chi/v5"
	httpSwagger "github.com/swaggo/http-swagger"
)

// newHandler creates a new HTTP handler.
// @title Task Manager API
// @version 1.0
// @BasePath /
//
// @securityDefinitions.apikey BearerToken
// @in header
// @name Authorization
//
// @description This is a Task Manager API server.
// @host localhost:8080
// @schemes http
func newHandler(db *sql.DB) (http.Handler, error) {
	r := chi.NewRouter()

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	// Swagger docs
	r.Route("/docs/v1/task-manager", func(r chi.Router) {
		r.Get("/swagger", func(w http.ResponseWriter, r *http.Request) {
			http.Redirect(w, r, "swagger/index.html", http.StatusMovedPermanently)
		})
		r.Get("/swagger/*", httpSwagger.Handler())
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
			r.With(auth.Auth).Post("/", rest.Handle(taskHandler.CreateTask))
			r.With(auth.Auth).Delete("/{task-id}", rest.Handle(taskHandler.DeleteTask))
			r.With(auth.Auth).Get("/{task-id}", rest.Handle(taskHandler.GetTask))
			r.With(auth.Auth).Put("/{task-id}", rest.Handle(taskHandler.UpdateTask))
			r.With(auth.Auth).Get("/", rest.Handle(taskHandler.GetTasks))
		})
	})

	return r, nil
}
