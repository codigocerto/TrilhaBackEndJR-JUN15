import { z } from "zod";

const Tasks = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const CreateTask = Tasks.pick({
  title: true,
  description: true,
});

const UpdateTask = CreateTask.partial();

const QueryFind = z.object({
  page: z.string().nullable().default("0").transform(Number),
  take: z.string().nullable().default("10").transform(Number),
  query: z.string().nullable(),
});

export type Tasks = z.infer<typeof Tasks>;
export type CreateTask = z.infer<typeof CreateTask>;
export type UpdateTask = z.infer<typeof UpdateTask>;
export type QueryFind = z.infer<typeof QueryFind>;

export { CreateTask, QueryFind, Tasks, UpdateTask };
