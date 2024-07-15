import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { TaskModel } from "../models/task.model";
import { UpdateTaskDTO } from "../controllers/DTOs/update-task.dto";
import { AppError } from "../shared/error/app-error";
import { getLogger } from "../shared/logger/app-logger";

@injectable()
export class UpdateTaskUseCase {
  constructor(
    @inject("TaskModel")
    private readonly taskModel: TaskModel
  ) {}

  async execute(id: string, task: UpdateTaskDTO): Promise<void> {
    const log = getLogger.getChildCategory(UpdateTaskUseCase.name);
    try {
      await this.taskModel.updateTask(id, task);
      log.debug(() => `Tarefa atualizada com sucesso: ${JSON.stringify(task)}`);
    } catch (error: any) {
      log.error(() => `${JSON.stringify(error)}`);
      throw new AppError(`${error.message}`, 404);
    }
  }
}
