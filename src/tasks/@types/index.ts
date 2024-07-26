import { z } from 'zod';

const Tasks = z.object({
  id: z.string().cuid(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  completed: z.boolean(),
  userId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const CreateTask = Tasks.pick({
  title: true,
  description: true,
  userId: true,
});

const UpdateTask = Tasks.partial();

export type Tasks = z.infer<typeof Tasks>;
export type CreateTask = z.infer<typeof CreateTask>;
export type UpdateTask = z.infer<typeof UpdateTask>;

export { CreateTask, Tasks, UpdateTask };
