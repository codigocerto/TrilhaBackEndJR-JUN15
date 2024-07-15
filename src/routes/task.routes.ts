import { Router } from "express";
import { FindAllTasksController } from "../controllers/find-all-tasks.controller";
import { FindTaskByIdController } from "../controllers/find-task-by-id.controller";
import { CreateTaskController } from "../controllers/create-task.controller";
import { UpdateTaskController } from "../controllers/update-task.controller";
import { ChangeTaskStatusController } from "../controllers/change-task-status.controller";
import { DeleTaskController } from "../controllers/delete-task.controller";

export const taskRouter = Router();

const findAllTasksController = new FindAllTasksController();
const createTaskController = new CreateTaskController();
const findTaskByIdController = new FindTaskByIdController();
const updateTaskController = new UpdateTaskController();
const changeTaskStatusController = new ChangeTaskStatusController();
const deleteTaskController = new DeleTaskController();

taskRouter.get("/tasks", findAllTasksController.handle);
taskRouter.get("/task/:id", findTaskByIdController.handle);
taskRouter.post("/tasks", createTaskController.handle);
taskRouter.patch("/task/update/:id", updateTaskController.handle);
taskRouter.put("/task/status/:id", changeTaskStatusController.handle);
taskRouter.delete("/task/delete/:id", deleteTaskController.handle);
