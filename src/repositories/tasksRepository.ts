import { prisma } from "../database/prisma";
import { Task } from "../models/taskModel";

class TasksRepository {
  async create({ title, description, completed = false, userId }: Task) {
    const createdTask = await prisma.task.create({
      data: {
        title,
        description,
        completed,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return createdTask;
  }

  async findById(taskId: string) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });
    return task;
  }

  async findByUserId(userId: string) {
    const tasksByUserId = await prisma.task.findMany({
      where: { userId },
    });

    return tasksByUserId;
  }

  async update(taskId: string, data: Partial<Task>) {
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data,
      include: {
        user: true,
      },
    });
    return updatedTask;
  }

  async deleteById(taskId: string) {
    const deletedTask = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    return deletedTask;
  }

  async findByTitleAndUserId(title: string, userId: string) {
    const task = await prisma.task.findFirst({
      where: {
        title,
        userId,
      },
    });
    return task;
  }
}

export { TasksRepository };
