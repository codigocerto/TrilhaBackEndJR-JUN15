import { Router } from "express";
import { UsersController } from "../controllers/usersController";
import { TasksController } from "../controllers/tasksController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const authMiddleware = new AuthMiddleware();

export const userRoutes = (router: Router) => {
  const usersController = new UsersController();
  const tasksController = new TasksController();

  router.post("/users", usersController.create);
  router.post("/users/login", usersController.login);
  router.get("/users/tasks/:userId", authMiddleware.auth, (req, res, next) =>
    tasksController.findByUserId(req, res, next)
  );
  router.put("/users/:id", authMiddleware.auth, usersController.update);
  router.delete("/users/:id", authMiddleware.auth, usersController.delete);
};
