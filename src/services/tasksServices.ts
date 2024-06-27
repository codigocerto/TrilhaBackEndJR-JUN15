import { Task } from "../models/taskModel";
import { TasksRepository } from "../repositories/tasksRepository";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/errors";

class TasksServices {
  private tasksRepository: TasksRepository;

  constructor() {
    this.tasksRepository = new TasksRepository();
  }

  async create(
    authenticatedUserId: string,
    { title, description, userId }: Partial<Task>
  ) {
    if (!title || !description || !userId) {
      throw new BadRequestError("Title, description, and userId are required");
    }

    if (userId !== authenticatedUserId) {
      throw new UnauthorizedError(
        "You can only create tasks for your own account"
      );
    }

    const existingTask = await this.tasksRepository.findByTitleAndUserId(
      title,
      userId
    );
    if (existingTask) {
      throw new BadRequestError(
        "Task with the same title already exists for this user"
      );
    }

    const createTask = await this.tasksRepository.create({
      title,
      description,
      userId,
    });
    return {
      id: createTask.id,
      title: createTask.title,
      description: createTask.description,
      completed: createTask.completed,
      userId: createTask.user.id,
      userName: createTask.user.name,
    };
  }

  async findById(authenticatedUserId: string, taskId: string) {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    if (task.userId !== authenticatedUserId) {
      throw new UnauthorizedError("You are not authorized to view this task");
    }

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      userId: task.user.id,
      userName: task.user.name,
    };
  }

  async findByUserId(authenticatedUserId: string, userId: string) {
    if (userId !== authenticatedUserId) {
      throw new UnauthorizedError("You are not authorized to view these tasks");
    }

    const tasks = await this.tasksRepository.findByUserId(userId);

    if (tasks.length === 0) {
      throw new NotFoundError("No tasks found for this user");
    }

    const tasksList = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      userId: task.userId,
      userName: task.user.name,
    }));

    return tasksList;
  }

  async update(
    authenticatedUserId: string,
    taskId: string,
    data: Partial<Task>
  ) {
    const existingTask = await this.tasksRepository.findById(taskId);
    if (!existingTask) {
      throw new NotFoundError("Task not found");
    }

    if (existingTask.userId !== authenticatedUserId) {
      throw new UnauthorizedError("You are not authorized to update this task");
    }

    if (data.title) {
      const duplicateTask = await this.tasksRepository.findByTitleAndUserId(
        data.title,
        authenticatedUserId
      );

      if (duplicateTask && duplicateTask.id !== taskId) {
        throw new BadRequestError(
          "A task with the same title already exists for this user"
        );
      }
    }

    const updatedTask = await this.tasksRepository.update(taskId, data);

    return {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      completed: updatedTask.completed,
      userId: updatedTask.user.id,
      userName: updatedTask.user.name,
    };
  }

  async delete(authenticatedUserId: string, taskId: string) {
    const existingTask = await this.tasksRepository.findById(taskId);
    if (!existingTask) {
      throw new NotFoundError("Task not found");
    }

    if (existingTask.userId !== authenticatedUserId) {
      throw new UnauthorizedError("You are not authorized to delete this task");
    }

    await this.tasksRepository.delete(taskId);
  }
}

export { TasksServices };
