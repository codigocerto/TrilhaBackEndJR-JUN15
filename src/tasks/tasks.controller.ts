import { Request, Response } from "express";
import { TasksServices } from "./tasks.service";

export class TasksController {
  constructor(private readonly tasksService: TasksServices) {}

  async create(req: Request, res: Response) {
    const body = req.body;
    try {
      const result = await this.tasksService.create(body);
      return res.status(201).send(result);
    } catch (error) {
      res.status(500).send({ message: `Error: ${error}` });
    }
  }

  async findAll(req: Request, res: Response) {
    const params = req.params;
    try {
      const user = await this.tasksService.findAll(params);
      return res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: `Error: ${error}` });
    }
  }
}
