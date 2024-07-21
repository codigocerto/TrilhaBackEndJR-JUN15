import { PrismaService } from '@/prisma';
import { Request, Response, Router } from 'express';
import { ParsedQs } from 'qs';
import { QueryFind } from './@types';
import { TasksServices } from './tasks.service';

const task = Router();
const prisma = new PrismaService();
const tasksService = new TasksServices(prisma);

task.post('/', async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const result = await tasksService.create(body);
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

task.post('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await tasksService.update(id, body);
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

export { task as Tasks };
