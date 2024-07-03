package task

import "task-manager/app/domain/usecases"

type Handler struct {
	usecase usecases.TaskUsecase
}

func NewHandler(usecase usecases.TaskUsecase) *Handler {
	return &Handler{
		usecase: usecase,
	}
}
