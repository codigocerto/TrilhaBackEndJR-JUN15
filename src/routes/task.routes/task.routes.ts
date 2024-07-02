import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { TaskService } from "../../services/task/TaskService";
import { TaskController } from "../../controllers/task/TaskController";

const task = Router()
const taskService = new TaskService();
const taskController = new TaskController(taskService);

task.post("/v1/create",
  isAuthenticated, (req, res) => taskController.handle(req, res)
);
task.put("/v1/editTask",
  isAuthenticated, (req, res) => taskController.update(req, res)
)
task.get("/v1/tasks",
  isAuthenticated, (req, res) => taskController.listar(req, res)
)
task.delete("/v1/remove", isAuthenticated, (req, res) => taskController.delete(req, res));

export default task;
