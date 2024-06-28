"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const tasksServices_1 = require("../services/tasksServices");
class TasksController {
    tasksServices;
    constructor() {
        this.tasksServices = new tasksServices_1.TasksServices();
    }
    async create(request, response, next) {
        const { title, description, completed, userId } = request.body;
        try {
            const authenticatedUserId = request.userId;
            const newTask = await this.tasksServices.create(authenticatedUserId, {
                title,
                description,
                completed,
                userId,
            });
            return response.status(201).json(newTask);
        }
        catch (error) {
            next(error);
        }
    }
    async findById(request, response, next) {
        const { taskId } = request.params;
        try {
            const authenticatedUserId = request.userId;
            const task = await this.tasksServices.findById(authenticatedUserId, taskId);
            return response.status(200).json(task);
        }
        catch (error) {
            next(error);
        }
    }
    async findByUserId(request, response, next) {
        const { userId } = request.params;
        const authenticatedUserId = request.userId;
        try {
            const tasks = await this.tasksServices.findByUserId(authenticatedUserId, userId);
            return response.status(200).json(tasks);
        }
        catch (error) {
            next(error);
        }
    }
    async update(request, response, next) {
        const { taskId } = request.params;
        const authenticatedUserId = request.userId;
        const { title, description, completed } = request.body;
        try {
            const updatedTask = await this.tasksServices.update(authenticatedUserId, taskId, {
                title,
                description,
                completed,
            });
            return response.status(200).json(updatedTask);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(request, response, next) {
        const { taskId } = request.params;
        const authenticatedUserId = request.userId;
        try {
            await this.tasksServices.delete(authenticatedUserId, taskId);
            return response.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.TasksController = TasksController;
