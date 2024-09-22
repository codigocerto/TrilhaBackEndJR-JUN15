import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { ChangeTaskStatusUseCase } from "../../usecases/task/change-task-status.usecase";

export class ChangeTaskStatusController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const { isDone } = req.body;

      const changeTaskStatus = container.resolve(ChangeTaskStatusUseCase);

      await changeTaskStatus.execute(id, isDone);

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
