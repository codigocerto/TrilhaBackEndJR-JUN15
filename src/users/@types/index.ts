import { z } from 'zod';

const User = z.object({
  id: z.string().cuid(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const CreateUser = User.pick({
  name: true,
  email: true,
  password: true,
});

const UpdateUser = CreateUser.partial();

export type User = z.infer<typeof User>;
export type CreateUser = z.infer<typeof CreateUser>;
export type UpdateUser = z.infer<typeof UpdateUser>;

export { CreateUser, UpdateUser, User };
