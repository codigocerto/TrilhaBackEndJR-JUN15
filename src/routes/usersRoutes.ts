import { Router } from "express";
import { UsersController } from "../controllers/usersController";

export const userRoutes = (router: Router) => {
  const usersController = new UsersController();

  router.post("/users", usersController.create);
  router.get("/users", usersController.findAll);
};
