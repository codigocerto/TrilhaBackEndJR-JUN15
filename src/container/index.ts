import "reflect-metadata";
import { container } from "tsyringe";
import { TaskModel } from "../models/task.model";
import { UserModel } from "../models/user.model";

container.registerSingleton("TaskModel", TaskModel);
container.registerSingleton("UserModel", UserModel);
