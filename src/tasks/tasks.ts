import { PrismaService } from "@/prisma";
import { Request, Response, Router } from "express";
import { TasksController } from "./tasks.controller";
import { TasksServices } from "./tasks.service";

const prisma = new PrismaService();
const tasksService = new TasksServices(prisma);
const tasksController = new TasksController(tasksService);

const task = Router();

task.post("/", (req: Request, res: Response) =>
  tasksController.create(req, res)
);
task.get("/", (req: Request, res: Response) =>
  tasksController.findAll(req, res)
);

export { task as Tasks };
