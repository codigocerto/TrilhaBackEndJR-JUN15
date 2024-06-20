import { Router } from "express";
import { UsersController } from "../controllers/usersController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const authMiddleware = new AuthMiddleware();

export const userRoutes = (router: Router) => {
  const usersController = new UsersController();

  router.post("/users", usersController.create);
  router.post("/users/login", usersController.login); // Rota de login
  router.put("/users/:id", authMiddleware.auth, usersController.update);
  router.delete("/users/:id", authMiddleware.auth, usersController.delete);
};
