import { Router } from "express";
import { UsersController } from "../controllers/usersController";

export const userRoutes = (router: Router) => {
  const usersController = new UsersController();

  router.post("/users", usersController.create);
  router.put("/users/:id", usersController.update);
  router.delete("/users/:id", usersController.delete);
};
