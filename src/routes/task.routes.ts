import { Router } from "express";
import { FindAllTasksController } from "../controllers/task/find-all-tasks.controller";
import { FindTaskByIdController } from "../controllers/task/find-task-by-id.controller";
import { CreateTaskController } from "../controllers/task/create-task.controller";
import { UpdateTaskController } from "../controllers/task/update-task.controller";
import { DeleTaskController } from "../controllers/task/delete-task.controller";
import { ChangeTaskStatusController } from "../controllers/task/change-task-status.controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated.middleware";

export const taskRouter = Router();

const findAllTasksController = new FindAllTasksController();
const createTaskController = new CreateTaskController();
const findTaskByIdController = new FindTaskByIdController();
const updateTaskController = new UpdateTaskController();
const changeTaskStatusController = new ChangeTaskStatusController();
const deleteTaskController = new DeleTaskController();

taskRouter.get("/tasks", ensureAuthenticated, findAllTasksController.handle);
taskRouter.get("/task/:id", ensureAuthenticated, findTaskByIdController.handle);
taskRouter.post("/tasks", ensureAuthenticated, createTaskController.handle);
taskRouter.patch(
  "/task/update/:id",
  ensureAuthenticated,
  updateTaskController.handle
);
taskRouter.put(
  "/task/status/:id",
  ensureAuthenticated,
  changeTaskStatusController.handle
);
taskRouter.delete(
  "/task/delete/:id",
  ensureAuthenticated,
  deleteTaskController.handle
);
