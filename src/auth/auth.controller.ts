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

export { auth as Auth };
