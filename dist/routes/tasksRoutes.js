"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRoutes = void 0;
const tasksController_1 = require("../controllers/tasksController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authMiddleware = new authMiddleware_1.AuthMiddleware();
const tasksRoutes = (router) => {
    const tasksController = new tasksController_1.TasksController();
    router.post("/tasks", authMiddleware.auth, (req, res, next) => tasksController.create(req, res, next));
    router.get("/tasks/:taskId", authMiddleware.auth, (req, res, next) => tasksController.findById(req, res, next));
    router.put("/tasks/:taskId", authMiddleware.auth, (req, res, next) => tasksController.update(req, res, next));
    router.delete("/tasks/:taskId", authMiddleware.auth, (req, res, next) => tasksController.delete(req, res, next));
};
exports.tasksRoutes = tasksRoutes;
