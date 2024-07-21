import { User } from '@/users/@types';
import { z } from 'zod';

const Login = User.pick({
  email: true,
  password: true,
});

const Token = z.object({
  accessToken: z.string(),
});

export type LoginSchema = z.infer<typeof Login>;
export type TokenSchema = z.infer<typeof Token>;

export { Login, Token };
