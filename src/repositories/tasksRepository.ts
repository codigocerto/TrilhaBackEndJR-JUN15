import { Task } from "@prisma/client";
import { prisma } from "../database/prisma";

class TasksRepository {
  async create({
    title,
    description,
    completed = false,
    userId,
  }: Partial<Task>) {
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
    const result = await prisma.task.findUnique({
      where: {
        id: userId,
      },
    });
    return result;
  }

  async update(
    userId: string,
    { title, description, completed }: Partial<Task>
  ) {
    const result = await prisma.task.update({
      where: {
        id: userId,
      },
      data: {
        title,
        description,
        completed,
      },
    });
    return result;
  }

  delete(id: string) {
    const result = prisma.task.delete({
      where: {
        id,
      },
    });
    return result;
  }

  async findByTitleAndUserId(title: string, userId: string) {
    const result = await prisma.task.findFirst({
      where: {
        title,
        userId,
      },
    });
    return result;
  }
}

export { TasksRepository };
