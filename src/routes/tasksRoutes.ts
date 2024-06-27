import { Router } from "express";
import { TasksController } from "../controllers/tasksController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const authMiddleware = new AuthMiddleware();

export const tasksRoutes = (router: Router) => {
  const tasksController = new TasksController();

  router.post("/tasks", authMiddleware.auth, (req, res, next) =>
    tasksController.create(req, res, next)
  );
  router.get("/tasks/:taskId", authMiddleware.auth, (req, res, next) =>
    tasksController.findById(req, res, next)
  );
  router.put("/tasks/:taskId", authMiddleware.auth, (req, res, next) =>
    tasksController.update(req, res, next)
  );
  router.delete("/tasks/:taskId", authMiddleware.auth, (req, res, next) =>
    tasksController.delete(req, res, next)
  );
};
