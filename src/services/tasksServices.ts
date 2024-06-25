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
    return createTask;
  }

  async findById(id: string) {
    if (!id) {
      throw new BadRequestError("UserId is required");
    }

    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new UnauthorizedError("Task not found");
    }

    return task;
  }

  async findByUserId(authenticatedUserId: string, userId: string) {
    if (!userId) {
      throw new BadRequestError("TaskId is required");
    }

    const task = await this.tasksRepository.findByUserId(userId);
    if (!task) {
      throw new NotFoundError("Task not found");
    }

    if (userId !== authenticatedUserId) {
      throw new UnauthorizedError("You are not authorized to view this task");
    }

    return task;
  }

  async update(
    authenticatedUserId: string,
    taskId: string,
    data: Partial<Task>
  ) {
    if (!taskId) {
      throw new BadRequestError("TaskId is required");
    }

    const existingTask = await this.tasksRepository.findById(taskId);
    if (!existingTask) {
      throw new NotFoundError("Task not found");
    }

    if (existingTask.userId !== authenticatedUserId) {
      throw new UnauthorizedError("You are not authorized to update this task");
    }

    if (data.title !== undefined && data.title.trim() === "") {
      throw new BadRequestError("Title cannot be empty");
    }

    const updatedTask = await this.tasksRepository.update(taskId, data);
    const { userId, user } = updatedTask;
    return {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      completed: updatedTask.completed,
      user: {
        id: userId,
        name: user.name,
      },
    };
  }

  async delete(authenticatedUserId: string, taskId: string) {
    if (!taskId) {
      throw new BadRequestError("TaskId is required");
    }

    const existingTask = await this.tasksRepository.findById(taskId);
    if (!existingTask) {
      throw new NotFoundError("Task not found");
    }

    if (existingTask.userId !== authenticatedUserId) {
      throw new UnauthorizedError("You are not authorized to delete this task");
    }

    await this.tasksRepository.deleteById(taskId);
  }
}

export { TasksServices };
