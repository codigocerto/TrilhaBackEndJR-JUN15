import "reflect-metadata";
import { container } from "tsyringe";
import { CreateTaskUseCase } from "../usecases/create-task.usecase";
import { Request, Response } from "express";
import { CreateTaskDTO } from "./DTOs/create-task.dto";

export class CreateTaskController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const createTask: CreateTaskDTO = req.body;

      const createTaskUseCase = container.resolve(CreateTaskUseCase);

      await createTaskUseCase.execute(createTask);

      return res.status(201).send();
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
