"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const prisma_1 = require("../database/prisma");
class UsersRepository {
    async create({ name, email, password }) {
        const result = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });
        return result;
    }
    async findById(id) {
        const result = await prisma_1.prisma.user.findUnique({
            where: {
                id,
            },
        });
        return result;
    }
    async findByEmail(email) {
        const result = await prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return result;
    }
    async update(id, name, email) {
        const result = await prisma_1.prisma.user.update({
            where: {
                id,
            },
            data: {
                name,
                email,
            },
        });
        return result;
    }
    async updatePassword(newPassword, id) {
        const result = await prisma_1.prisma.user.update({
            where: {
                id,
            },
            data: {
                password: newPassword,
            },
        });
        return result;
    }
    async delete(id) {
        await prisma_1.prisma.task.deleteMany({
            where: {
                userId: id,
            },
        });
        const result = await prisma_1.prisma.user.delete({
            where: {
                id,
            },
        });
        return result;
    }
}
exports.UsersRepository = UsersRepository;
