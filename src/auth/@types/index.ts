import { User } from '@/users/@types';
import { z } from 'zod';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

const Login = User.pick({
  email: true,
  password: true,
});

export type LoginSchema = z.infer<typeof Login>;

export { Login };
