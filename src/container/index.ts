import "reflect-metadata";
import { container } from "tsyringe";
import { TaskModel } from "../models/task.model";

container.registerSingleton("TaskModel", TaskModel);
