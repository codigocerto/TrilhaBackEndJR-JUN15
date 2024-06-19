import { Router } from "express";
import { TasksController } from "../controllers/tasksController";

export const tasksRoutes = (router: Router) => {
  const tasksController = new TasksController();

  router.post("/tasks", tasksController.create);
  router.get("/tasks/user/:userId", tasksController.findByUserId);
  router.put("/tasks/:id", tasksController.update);
  router.delete("/tasks/:id", tasksController.delete);
};
