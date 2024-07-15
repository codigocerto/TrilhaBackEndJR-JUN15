import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { TaskModel } from "../models/task.model";
import { ITask } from "../models/task.interface";
import { AppError } from "../shared/error/app-error";
import { getLogger } from "../shared/logger/app-logger";

@injectable()
export class FindAllTaskUseCase {
  constructor(
    @inject("TaskModel")
    private readonly taskModel: TaskModel
  ) {}

  async execute(): Promise<ITask[]> {
    const log = getLogger.getChildCategory(FindAllTaskUseCase.name);
    try {
      const tasks = await this.taskModel.findAll();
      log.debug(() => `${JSON.stringify(tasks)}`);
      return tasks;
    } catch (error: any) {
      log.error(() => `${JSON.stringify(error)}`);
      throw new AppError(`${error.message}`);
    }
  }
}
