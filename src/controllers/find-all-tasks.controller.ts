import "reflect-metadata";
import { container } from "tsyringe";
import { FindAllTaskUseCase } from "../usecases/find-all-task.usecase";
import { Request, Response } from "express";

export class FindAllTasksController {
  constructor() {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const findAllTaskUseCase = container.resolve(FindAllTaskUseCase);

      const tasks = await findAllTaskUseCase.execute();

      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
