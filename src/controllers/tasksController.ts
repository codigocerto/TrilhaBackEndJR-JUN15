import { NextFunction, Request, Response } from "express";
import { TasksServices } from "../services/tasksServices";

class TasksController {
  private tasksServices: TasksServices;

  constructor() {
    this.tasksServices = new TasksServices();
    this.create = this.create.bind(this);
    this.findByUserId = this.findByUserId.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const { title, description, completed, userId } = request.body;

    try {
      const result = await this.tasksServices.create({
        title,
        description,
        completed,
        userId,
      });
      return response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findByUserId(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;

    try {
      const result = await this.tasksServices.findByUserId(userId);
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const { title, description, completed } = request.body;

    try {
      const existingTask = await this.tasksServices.findById(id);
      if (!existingTask) {
        return response.status(404).json({ error: "Task not found" });
      }

      const result = await this.tasksServices.update(id, {
        title,
        description,
        completed,
      });

      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    try {
      await this.tasksServices.delete(id);
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export { TasksController };
