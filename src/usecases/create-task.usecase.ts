import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { TaskModel } from "../models/task.model";
import { CreateTaskDTO } from "../controllers/DTOs/create-task.dto";
import { AppError } from "../shared/error/app-error";
import { getLogger } from "../shared/logger/app-logger";

@injectable()
export class CreateTaskUseCase {
  constructor(
    @inject("TaskModel")
    private readonly taskModel: TaskModel
  ) {}

  async execute(createTask: CreateTaskDTO): Promise<any> {
    const log = getLogger.getChildCategory(CreateTaskUseCase.name);
    try {
      await this.taskModel.createTask(createTask);
      log.debug(
        () => `Tarefa criada com sucesso: ${JSON.stringify(createTask)}`
      );
    } catch (error) {
      log.error(() => `${JSON.stringify(error)}`);
      throw new AppError(`${error}`);
    }
  }
}
