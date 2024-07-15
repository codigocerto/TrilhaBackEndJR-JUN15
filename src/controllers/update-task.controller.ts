import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { UpdateTaskDTO } from "./DTOs/update-task.dto";
import { UpdateTaskUseCase } from "../usecases/update-task.usecase";

export class UpdateTaskController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const task: UpdateTaskDTO = req.body;

      const updateTaskUseCase = container.resolve(UpdateTaskUseCase);

      await updateTaskUseCase.execute(id, task);

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
