import { QueryFind } from '@/@types';
import { PrismaService } from '@/prisma';
import { generateSlug } from '@/utils';
import { Task } from '@prisma/client';
import { CreateTask, UpdateTask } from './@types';

class TasksServices {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateTask): Promise<Task | Error> {
    const { success, error, data } = CreateTask.safeParse(body);

    if (!success) throw new Error(error?.issues[0].message);

    const slug = generateSlug(data.title);

    const eventWithSameSlug = await this.prisma.task.findUnique({
      where: { slug },
    });

    if (eventWithSameSlug !== null) {
      throw new Error('Task already exists');
    }

    return this.prisma.task.create({
      data: {
        ...data,
        slug,
      },
    });
  }

  async findAll(queryParams: QueryFind): Promise<Task[]> {
    const { page, query, take } = queryParams;
    return this.prisma.task.findMany({
      where: query
        ? {
            title: {
              contains: query,
            },
          }
        : {},
      include: { comments: true },
      take,
      skip: page * 10,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Task | null> {
    const tasks = this.prisma.task.findUnique({
      where: { id },
      include: { comments: true },
    });

    if (!tasks) throw new Error('Task not exist');

    return tasks;
  }

  async update(
    userId: string,
    taskId: string,
    body: UpdateTask,
  ): Promise<Task | Error> {
    const { success, error, data } = UpdateTask.safeParse(body);

    if (!success) throw new Error(error?.issues[0].message);

    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    if (!task) throw new Error('Task not exist');
    if (task?.userId !== userId) throw new Error('Unauthorized');

    if (data.title) {
      const slug = generateSlug(data.title);

      const eventWithSameSlug = await this.prisma.task.findUnique({
        where: { slug },
      });

      if (eventWithSameSlug && eventWithSameSlug.id !== taskId) {
        throw new Error('Task with same slug already exists');
      }

      return this.prisma.task.update({
        where: { id: taskId },
        data: {
          title: data.title,
          slug,
        },
        include: { comments: true },
      });
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: { ...data },
      include: { comments: true },
    });
  }

  async delete(userId: string, taskId: string): Promise<boolean | Error> {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw new Error('Task not exist');
    if (task?.userId !== userId) throw new Error('Unauthorized');

    await this.prisma.task.delete({ where: { id: taskId } });

    return true;
  }
}

export { TasksServices };
