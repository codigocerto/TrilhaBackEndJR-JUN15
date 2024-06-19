import { Task } from "../models/taskModel";
import { TasksRepository } from "../repositories/tasksRepository";

class TasksServices {
  private tasksRepository: TasksRepository;

  constructor() {
    this.tasksRepository = new TasksRepository();
  }

  async create({ title, description, completed, userId }: Partial<Task>) {
    const existingTask = await this.tasksRepository.findByTitleAndUserId(
      title!,
      userId!
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
    const tasks = await this.tasksRepository.findByUserId(userId);
    return tasks;
  }

  async update(taskId: string, data: Partial<Task>) {
    const existingTask = await this.tasksRepository.findById(taskId);
    if (!existingTask) {
      throw new Error("Task not found");
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

  async findById(id: string) {
    const task = await this.tasksRepository.findById(id);
    return task;
  }
}

export { TasksServices };
