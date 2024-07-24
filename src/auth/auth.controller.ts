import {
  AuthenticatedRequest,
  authMiddleware,
} from '@/middleware/auth.middleware';
import { PrismaService } from '@/prisma';
import { Request, Response, Router } from 'express';
import { AuthServices } from './auth.service';

const auth = Router();
const prisma = new PrismaService();
const authService = new AuthServices(prisma);

auth.post('/login', async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const result = await authService.login(body);
    return res.status(201).send(result);
  } catch (err: any) {
    let message;
    if (err.errors) {
      message = err.errors.map((error: any) => error.message).join(', ');
    } else {
      message = err.message;
    }
    return res.status(500).send(err?.code ?? message ?? `${err}`);
  }
});

auth.delete(
  '/logout',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.user;
    try {
      const result = await authService.logout(userId);
      return res.status(200).send(result);
    } catch (err: any) {
      let message;
      if (err.errors) {
        message = err.errors.map((error: any) => error.message).join(', ');
      } else {
        message = err.message;
      }
      return res.status(500).send(err?.code ?? message ?? `${err}`);
    }
  },
);

export { auth as Auth };
