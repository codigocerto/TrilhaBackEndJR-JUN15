import "reflect-metadata";
import { container } from "tsyringe";
import { FindTaskByIdUseCase } from "../usecases/find-task-by-id.usecase";
import { Request, Response } from "express";

export class FindTaskByIdController {
  constructor() {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const findTaskByIdUseCase = container.resolve(FindTaskByIdUseCase);

      const task = await findTaskByIdUseCase.execute(id);

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
