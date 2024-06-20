import { Task } from "../models/taskModel";
import { TasksRepository } from "../repositories/tasksRepository";

class TasksServices {
  private tasksRepository: TasksRepository;

  constructor() {
    this.tasksRepository = new TasksRepository();
  }

  async create({ title, description, completed, userId }: Partial<Task>) {
    if (!title || !userId) {
      throw new Error("Title and userId are required.");
    }

    const existingTask = await this.tasksRepository.findByTitleAndUserId(
      title,
      userId
    );
    if (existingTask) {
      throw new Error("Task with the same title already exists for this user.");
    }

    const createTask = await this.tasksRepository.create({
      title,
      description,
      completed,
      userId,
    });
    return createTask;
  }

  async findByUserId(userId: string) {
    if (!userId) {
      throw new Error("UserId is required.");
    }

    const tasks = await this.tasksRepository.findByUserId(userId);
    return tasks;
  }

  async update(taskId: string, data: Partial<Task>) {
    if (!taskId) {
      throw new Error("TaskId is required.");
    }

    const existingTask = await this.tasksRepository.findById(taskId);
    if (!existingTask) {
      throw new Error("Task not found");
    }

    if (data.title !== undefined && data.title.trim() === "") {
      throw new Error("Title cannot be empty.");
    }

    const updatedTask = await this.tasksRepository.update(taskId, data);
    const { userId, user } = updatedTask;
    const { name } = user;
    return {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      completed: updatedTask.completed,
      user: {
        id: userId,
        name,
      },
    };
  }

  async delete(id: string) {
    if (!id) {
      throw new Error("TaskId is required.");
    }

    const existingTask = await this.tasksRepository.findById(id);
    if (!existingTask) {
      throw new Error("Task not found");
    }

    await this.tasksRepository.delete(id);
  }

  async findById(id: string) {
    if (!id) {
      throw new Error("TaskId is required.");
    }

    const task = await this.tasksRepository.findById(id);
    return task;
  }
}

export { TasksServices };
