import { NextFunction, Request, Response } from "express";
import { TasksServices } from "../services/tasksServices";
import { BadRequestError } from "../utils/errors";

class TasksController {
  private tasksServices: TasksServices;

  constructor() {
    this.tasksServices = new TasksServices();
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const { title, description, completed } = request.body;
    const userId = request.id;

    if (!userId) {
      return next(new BadRequestError("User ID is required"));
    }

    try {
      const newTask = await this.tasksServices.create({
        title,
        description,
        completed,
        userId,
        authenticatedUserId: userId,
      });
      return response.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  }

  async findById(request: Request, response: Response, next: NextFunction) {
    const userId = request.id;
    const { taskId } = request.params;

    if (!userId) {
      return next(new BadRequestError("User ID is required"));
    }

    try {
      const task = await this.tasksServices.findById(userId, taskId);
      return response.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async findByUserId(request: Request, response: Response, next: NextFunction) {
    const userId = request.id;

    if (!userId) {
      return next(new BadRequestError("User ID is required"));
    }

    try {
      const tasks = await this.tasksServices.findByUserId(userId, userId);
      return response.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { title, description, completed } = request.body;
    const userId = request.id;
    const { taskId } = request.params;

    if (!userId) {
      return next(new BadRequestError("User ID is required"));
    }

    try {
      const updatedTask = await this.tasksServices.update(userId, taskId, {
        title,
        description,
        completed,
      });

      return response.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const userId = request.id;
    const { taskId } = request.params;

    if (!userId) {
      return next(new BadRequestError("User ID is required"));
    }

    try {
      await this.tasksServices.delete(userId, taskId);
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export { TasksController };
