import { Task } from "@prisma/client";
import { prisma } from "../database/prisma";

class TasksRepository {
  async create({ title, description, completed, userId }: Task) {
    const result = await prisma.task.create({
      data: {
        title,
        description,
        completed,
        userId,
      },
    });
    return result;
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
}

export { TasksRepository };
