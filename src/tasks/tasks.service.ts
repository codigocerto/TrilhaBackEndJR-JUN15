import { PrismaService } from '@/prisma';
import { generateSlug } from '@/utils';
import { Task } from '@prisma/client';
import { CreateTask, QueryFind, UpdateTask } from './@types';

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
        title: data.title,
        description: data.description,
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
      take,
      skip: page * 10,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Task | null> {
    const tasks = this.prisma.task.findUnique({ where: { id } });

    if (!tasks) throw new Error('Task not exist');

    return tasks;
  }

  async update(id: string, body: UpdateTask): Promise<Task | Error> {
    const { success, error, data } = UpdateTask.safeParse(body);

    if (!success) throw new Error(error?.issues[0].message);

    if (data.title) {
      const slug = generateSlug(data.title);

      const eventWithSameSlug = await this.prisma.task.findUnique({
        where: { slug },
      });

      if (eventWithSameSlug && eventWithSameSlug.id !== id) {
        throw new Error('Task with same slug already exists');
      }

      return this.prisma.task.update({
        where: { id },
        data: {
          title: data.title,
          slug,
        },
      });
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        description: data.description,
      },
    });
  }

  async delete(id: string): Promise<true | Error> {
    const task = await this.findOne(id);

    if (!task) throw new Error('Task not exist');

    await this.prisma.task.delete({ where: { id } });

    return true;
  }
}

export { TasksServices };
