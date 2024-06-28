"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const usersController_1 = require("../controllers/usersController");
const tasksController_1 = require("../controllers/tasksController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authMiddleware = new authMiddleware_1.AuthMiddleware();
const userRoutes = (router) => {
    const usersController = new usersController_1.UsersController();
    const tasksController = new tasksController_1.TasksController();
    router.post("/users", usersController.create);
    router.post("/users/login", usersController.login);
    router.get("/users/tasks/:userId", authMiddleware.auth, (req, res, next) => tasksController.findByUserId(req, res, next));
    router.put("/users/:id", authMiddleware.auth, usersController.update);
    router.delete("/users/:id", authMiddleware.auth, usersController.delete);
};
exports.userRoutes = userRoutes;
