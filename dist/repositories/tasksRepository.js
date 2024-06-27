"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksRepository = void 0;
const prisma_1 = require("../database/prisma");
class TasksRepository {
    async create({ title, description, completed = false, userId }) {
        const createdTask = await prisma_1.prisma.task.create({
            data: {
                title,
                description,
                completed,
                userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        return createdTask;
    }
    async findById(taskId) {
        const task = await prisma_1.prisma.task.findUnique({
            where: { id: taskId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        return task;
    }
    async findByUserId(userId) {
        const tasksByUserId = await prisma_1.prisma.task.findMany({
            where: { userId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        return tasksByUserId;
    }
    async update(taskId, data) {
        const updatedTask = await prisma_1.prisma.task.update({
            where: {
                id: taskId,
            },
            data,
            include: {
                user: true,
            },
        });
        return updatedTask;
    }
    async delete(taskId) {
        const deletedTask = await prisma_1.prisma.task.delete({
            where: {
                id: taskId,
            },
        });
        return deletedTask;
    }
    async findByTitleAndUserId(title, userId) {
        const task = await prisma_1.prisma.task.findFirst({
            where: {
                title,
                userId,
            },
        });
        return task;
    }
}
exports.TasksRepository = TasksRepository;
