import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { TaskModel } from "../../models/task.model";
import { AppError } from "../../shared/error/app-error";
import { getLogger } from "../../shared/logger/app-logger";
import { ITask } from "../../models/interfaces/task.interface";

@injectable()
export class FindTaskByIdUseCase {
  constructor(
    @inject("TaskModel")
    private readonly taskModel: TaskModel
  ) {}

  async execute(id: string): Promise<ITask> {
    const log = getLogger.getChildCategory(FindTaskByIdUseCase.name);
    try {
      const task = await this.taskModel.findById(id);
      log.debug(() => `${JSON.stringify(task)}`);
      return task;
    } catch (error: any) {
      log.error(() => `${JSON.stringify(error)}`);
      throw new AppError(`${error.message}`, 404);
    }
  }
}
