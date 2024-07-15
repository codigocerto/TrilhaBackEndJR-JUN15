import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { DeleteTaskUseCase } from "../usecases/delete-task.usecase";

export class DeleTaskController {
  constructor() {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const deleteTaskUseCase = container.resolve(DeleteTaskUseCase);

      const task = await deleteTaskUseCase.execute(id);

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
