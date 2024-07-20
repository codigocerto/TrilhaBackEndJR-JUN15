import { PrismaService } from "@/prisma";
import { Request, Response, Router } from "express";
import { ParsedQs } from "qs";
import { QueryFind } from "./@types";
import { TasksServices } from "./tasks.service";

const task = Router();
const prisma = new PrismaService();
const tasksService = new TasksServices(prisma);

task.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const result = await tasksService.create(body);
    return res.status(201).send(result);
  } catch (error: unknown) {
    res.status(500).send(error);
  }
});

task.get("/", async (req: Request, res: Response) => {
  const { query, page, take } = req.query as ParsedQs;
  const queryParams: QueryFind = {
    query: query ? String(query) : null,
    page: page ? Number(page) : 0,
    take: take ? Number(take) : 10,
  };
  try {
    const user = await tasksService.findAll(queryParams);
    return res.status(200).send(user);
  } catch (error: unknown) {
    res.status(500).send(error);
  }
});

export { task as Tasks };
