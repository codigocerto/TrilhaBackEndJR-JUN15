import { QueryFind } from '@/@types';
import {
  AuthenticatedRequest,
  authMiddleware,
} from '@/middleware/auth.middleware';
import { PrismaService } from '@/prisma';
import { Request, Response, Router } from 'express';
import { ParsedQs } from 'qs';
import { TasksServices } from './tasks.service';

const task = Router();
const prisma = new PrismaService();
const tasksService = new TasksServices(prisma);

task.post(
  '/',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const body = req.body;
    const { userId } = req.user;
    try {
      const result = await tasksService.create({ userId, ...body });
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

task.get('/', async (req: Request, res: Response) => {
  const { query, page, take } = req.query as ParsedQs;
  const queryParams: QueryFind = {
    query: query ? String(query) : null,
    page: page ? Number(page) : 0,
    take: take ? Number(take) : 10,
  };
  try {
    const result = await tasksService.findAll(queryParams);
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
});

task.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await tasksService.findOne(id);
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
});

task.put(
  '/:taskId',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.user;
    const { taskId } = req.params;
    const body = req.body;
    try {
      const result = await tasksService.update(userId, taskId, body);
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

task.delete(
  '/:id',
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.user;
    const taskId = req.params.id;
    try {
      const result = await tasksService.delete(userId, taskId);
      return res
        .status(200)
        .send({ message: 'Successfully deleted task', result });
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

export { task as Tasks };
