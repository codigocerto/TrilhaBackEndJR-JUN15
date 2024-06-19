import { Router } from "express";
import { TasksController } from "../controllers/tasksController";

export const tasksRoutes = (router: Router) => {
  const tasksController = new TasksController();

  router.post("/tasks", tasksController.create);
};
