package user

import "task-manager/app/domain/usecases"

type Handler struct {
	usecase usecases.UserUsecase
}

func NewHandler(usecase usecases.UserUsecase) *Handler {
	return &Handler{
		usecase: usecase,
	}
}
