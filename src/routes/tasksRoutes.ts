import { Router } from "express";
import { TasksController } from "../controllers/tasksController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const authMiddleware = new AuthMiddleware();

export const tasksRoutes = (router: Router) => {
  const tasksController = new TasksController();

  router.post("/tasks", authMiddleware.auth, tasksController.create);
  router.get(
    "/tasks/user/:userId",
    authMiddleware.auth,
    tasksController.findByUserId
  );
  router.put("/tasks/:id", authMiddleware.auth, tasksController.update);
  router.delete("/tasks/:id", authMiddleware.auth, tasksController.delete);
};
