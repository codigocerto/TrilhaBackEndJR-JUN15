import { Router } from "express";
import { CreateUserController } from "../controllers/user/create-user.controller";
import { FindAllUserController } from "../controllers/user/find-all-user.controller";
import { AuthenticateUserController } from "../controllers/user/auth/authenticate-user.controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated.middleware";

export const userRouter = Router();

const createUserController = new CreateUserController();
const findAllUserController = new FindAllUserController();
const authenticateUserController = new AuthenticateUserController();

userRouter.post("/user", createUserController.handle);
userRouter.get("/user", ensureAuthenticated, findAllUserController.handle);
userRouter.post("/auth/user", authenticateUserController.handle);
