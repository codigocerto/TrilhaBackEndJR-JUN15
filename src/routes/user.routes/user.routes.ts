import { Router } from "express";
import { ExpressRouterAdapter } from "../../infra/Http/adapters/ExpressRouterAdapter";
import { UserService } from "../../services/user/UserService";
import { UserController } from "../../controllers/user/UserController";
import { isAuthenticated } from "../../middlewares/isAuthenticated";


const user = Router();
const userService = new UserService();
const userController = new UserController(userService);

user.post("/v1/create",
    ExpressRouterAdapter.adapt(userController, 'handle')
);
user.get("/v1/me",
  isAuthenticated, (req, res) => userController.buscarPorEmail(req, res)
);
user.delete("/v1/remove", isAuthenticated, (req, res) => userController.delete(req, res));

export default user;
