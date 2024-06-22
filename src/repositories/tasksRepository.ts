import { prisma } from "../database/prisma";
import { Task } from "../models/taskModel";

class TasksRepository {
  async create({ title, description, completed = false, userId }: Task) {
    if (!title || !description || !userId) {
      throw new Error("Title, description, and userId are required");
    }

    const result = await prisma.task.create({
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
    return {
      id: result.id,
      title: result.title,
      description: result.description,
      completed: result.completed,
      user: {
        id: result.user.id,
        name: result.user.name,
      },
    };
  }

  async findAll() {
    const result = await prisma.task.findMany({});
    return result;
  }

  async findByUserId(userId: string) {
    if (!userId) {
      throw new Error("UserId is required");
    }

    const result = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return result;
  }

  async update(taskId: string, data: Partial<Task>) {
    if (!taskId) {
      throw new Error("TaskId is required");
    }

    const result = await prisma.task.update({
      where: {
        id: taskId,
      },
      data,
      include: {
        user: true,
      },
    });
    return result;
  }

  async delete(id: string) {
    if (!id) {
      throw new Error("TaskId is required");
    }

    const result = await prisma.task.delete({
      where: {
        id,
      },
    });
    return result;
  }

  async findByTitleAndUserId(title: string, userId: string) {
    if (!title || !userId) {
      throw new Error("Title and userId are required");
    }

    const result = await prisma.task.findFirst({
      where: {
        title,
        userId,
      },
    });
    return result;
  }

  async findById(id: string) {
    if (!id) {
      throw new Error("TaskId is required");
    }

    return prisma.task.findUnique({
      where: { id },
      include: { user: true },
    });
  }
}

export { TasksRepository };
