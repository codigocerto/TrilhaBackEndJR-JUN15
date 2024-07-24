import { AuthServices } from '@/auth/auth.service';
import {
  AuthenticatedRequest,
  authMiddleware,
} from '@/middleware/auth.middleware';
import { PrismaService } from '@/prisma';
import { Request, Response, Router } from 'express';
import { UsersServices } from './users.service';

const user = Router();
const prisma = new PrismaService();
const authServices = new AuthServices(prisma);
const usersService = new UsersServices(prisma, authServices);

user.post('/', async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const result = await usersService.create(body);
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

user.get('/all', async (req: Request, res: Response) => {
  try {
    const result = await usersService.findAll();
    return res.status(200).send(result);
  } catch (err: any) {
    let message;
    if (err.errors) {
      message = err.errors.map((error: any) => error.message).join(', ');
    } else {
      message = err.message;
    }
    return res.status(404).send({ error: message });
  }
});

user.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await usersService.findById({ id });
    return res.status(200).send(result);
  } catch (err: any) {
    let message;
    if (err.errors) {
      message = err.errors.map((error: any) => error.message).join(', ');
    } else {
      message = err.message;
    }
    return res.status(404).send({ error: message });
  }
});

user.get(
  '/',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.user;
    try {
      const result = await usersService.findOne({ id: userId });
      return res.status(200).send(result);
    } catch (err: any) {
      let message;
      if (err.errors) {
        message = err.errors.map((error: any) => error.message).join(', ');
      } else {
        message = err.message;
      }
      return res.status(404).send({ error: message });
    }
  },
);

user.put(
  '/',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.user;
    const { body } = req;
    try {
      const result = await usersService.update(userId, body);
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
  },
);

user.delete(
  '/',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.user;
    const { password } = req.body;
    try {
      const result = await usersService.delete(userId, password);
      return res
        .status(200)
        .send({ message: 'Successfully deleted user ', result });
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

export { user as Users };
