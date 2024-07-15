import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { TaskModel } from "../models/task.model";
import { AppError } from "../shared/error/app-error";
import { getLogger } from "../shared/logger/app-logger";

@injectable()
export class DeleteTaskUseCase {
  constructor(
    @inject("TaskModel")
    private readonly taskModel: TaskModel
  ) {}

  async execute(id: string): Promise<void> {
    const log = getLogger.getChildCategory(DeleteTaskUseCase.name);
    try {
      await this.taskModel.deleteTask(id);
      log.debug(() => `Tarefa excluída com sucesso: ${id}`);
    } catch (error: any) {
      log.error(() => `${JSON.stringify(error)}`);
      throw new AppError(`${error.message}`, 404);
    }
  }
}
