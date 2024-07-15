import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { TaskModel } from "../models/task.model";
import { AppError } from "../shared/error/app-error";
import { getLogger } from "../shared/logger/app-logger";

@injectable()
export class ChangeTaskStatusUseCase {
  constructor(
    @inject("TaskModel")
    private readonly taskModel: TaskModel
  ) {}

  async execute(id: string, isDone: boolean): Promise<void> {
    const log = getLogger.getChildCategory(ChangeTaskStatusUseCase.name);
    try {
      await this.taskModel.changeTaskStatus(id, isDone);
      log.debug(() => `Tarefa alterada com sucesso: ${id}`);
    } catch (error: any) {
      log.error(() => `${JSON.stringify(error)}`);
      throw new AppError(`${error.message}`, 404);
    }
  }
}
