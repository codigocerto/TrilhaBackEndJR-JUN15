"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksServices = void 0;
const tasksRepository_1 = require("../repositories/tasksRepository");
const errors_1 = require("../utils/errors");
class TasksServices {
    tasksRepository;
    constructor() {
        this.tasksRepository = new tasksRepository_1.TasksRepository();
    }
    async create(authenticatedUserId, { title, description, userId }) {
        if (!title || !description || !userId) {
            throw new errors_1.BadRequestError("Title, description, and userId are required");
        }
        if (userId !== authenticatedUserId) {
            throw new errors_1.UnauthorizedError("You can only create tasks for your own account");
        }
        const existingTask = await this.tasksRepository.findByTitleAndUserId(title, userId);
        if (existingTask) {
            throw new errors_1.BadRequestError("Task with the same title already exists for this user");
        }
        const createTask = await this.tasksRepository.create({
            title,
            description,
            userId,
        });
        return {
            id: createTask.id,
            title: createTask.title,
            description: createTask.description,
            completed: createTask.completed,
            userId: createTask.user.id,
            userName: createTask.user.name,
        };
    }
    async findById(authenticatedUserId, taskId) {
        const task = await this.tasksRepository.findById(taskId);
        if (!task) {
            throw new errors_1.NotFoundError("Task not found");
        }
        if (task.userId !== authenticatedUserId) {
            throw new errors_1.UnauthorizedError("You are not authorized to view this task");
        }
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            completed: task.completed,
            userId: task.user.id,
            userName: task.user.name,
        };
    }
    async findByUserId(authenticatedUserId, userId) {
        if (userId !== authenticatedUserId) {
            throw new errors_1.UnauthorizedError("You are not authorized to view these tasks");
        }
        const tasks = await this.tasksRepository.findByUserId(userId);
        if (tasks.length === 0) {
            throw new errors_1.NotFoundError("No tasks found for this user");
        }
        const tasksList = tasks.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            completed: task.completed,
            userId: task.userId,
            userName: task.user.name,
        }));
        return tasksList;
    }
    async update(authenticatedUserId, taskId, data) {
        const existingTask = await this.tasksRepository.findById(taskId);
        if (!existingTask) {
            throw new errors_1.NotFoundError("Task not found");
        }
        if (existingTask.userId !== authenticatedUserId) {
            throw new errors_1.UnauthorizedError("You are not authorized to update this task");
        }
        if (data.title) {
            const duplicateTask = await this.tasksRepository.findByTitleAndUserId(data.title, authenticatedUserId);
            if (duplicateTask && duplicateTask.id !== taskId) {
                throw new errors_1.BadRequestError("A task with the same title already exists for this user");
            }
        }
        const updatedTask = await this.tasksRepository.update(taskId, data);
        return {
            id: updatedTask.id,
            title: updatedTask.title,
            description: updatedTask.description,
            completed: updatedTask.completed,
            userId: updatedTask.user.id,
            userName: updatedTask.user.name,
        };
    }
    async delete(authenticatedUserId, taskId) {
        const existingTask = await this.tasksRepository.findById(taskId);
        if (!existingTask) {
            throw new errors_1.NotFoundError("Task not found");
        }
        if (existingTask.userId !== authenticatedUserId) {
            throw new errors_1.UnauthorizedError("You are not authorized to delete this task");
        }
        await this.tasksRepository.delete(taskId);
    }
}
exports.TasksServices = TasksServices;
