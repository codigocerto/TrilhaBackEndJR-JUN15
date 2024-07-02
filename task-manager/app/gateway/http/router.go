package http

import (
	"database/sql"
	"net/http"
	userUsecase "task-manager/app/domain/usecases/users"
	userRepo "task-manager/app/gateway/http/db/sqlite3/user"
	"task-manager/app/gateway/http/rest"
	"task-manager/app/gateway/http/user"

	"github.com/go-chi/chi/v5"
)

func newHandler(db *sql.DB) (http.Handler, error) {
	r := chi.NewRouter()

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	userRepo := userRepo.NewUserRepository(db)
	userUsecase := userUsecase.NewUsecase(userRepo)
	userHandler := user.NewHandler(userUsecase)

	r.Route("/api/v1/task-manager", func(r chi.Router) {
		r.Post("/", rest.Handle(userHandler.CreateUser))
	})

	return r, nil
}
