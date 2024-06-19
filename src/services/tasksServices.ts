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
}

export { TasksServices };
