import { NextFunction, Request, Response } from "express";
import { TasksServices } from "../services/tasksServices";

class TasksController {
  private tasksServices: TasksServices;

  constructor() {
    this.tasksServices = new TasksServices();
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const { title, description, completed, userId } = request.body;

    try {
      const authenticatedUserId = request.userId;
      const newTask = await this.tasksServices.create(authenticatedUserId!, {
        title,
        description,
        completed,
        userId,
      });
      return response.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  }

  async findById(request: Request, response: Response, next: NextFunction) {
    const { taskId } = request.params;

    try {
      const authenticatedUserId = request.userId;
      const task = await this.tasksServices.findById(
        authenticatedUserId!,
        taskId
      );
      return response.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async findByUserId(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;
    const authenticatedUserId = request.userId;

    try {
      const tasks = await this.tasksServices.findByUserId(
        authenticatedUserId!,
        userId
      );
      return response.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { taskId } = request.params;
    const authenticatedUserId = request.userId;
    const { title, description, completed } = request.body;

    try {
      const updatedTask = await this.tasksServices.update(
        authenticatedUserId!,
        taskId!,
        {
          title,
          description,
          completed,
        }
      );

      return response.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const { taskId } = request.params;
    const authenticatedUserId = request.userId;

    try {
      await this.tasksServices.delete(authenticatedUserId!, taskId!);
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export { TasksController };
