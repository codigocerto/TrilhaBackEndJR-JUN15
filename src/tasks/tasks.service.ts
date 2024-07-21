import { PrismaService } from "@/prisma";
import { generateSlug } from "@/utils/generate-slug";
import { Task } from "@prisma/client";
import { CreateTask, QueryFind } from "./@types";

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
      throw new Error("Task already exists");
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
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string): Promise<Task | null> {
    const tasks = this.prisma.task.findUnique({ where: { id } });

    if (!tasks) throw new Error("Task not exist");

    return tasks;
  }
}

export { TasksServices };
