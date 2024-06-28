"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const usersServices_1 = require("../services/usersServices");
class UsersController {
    usersServices;
    constructor() {
        this.usersServices = new usersServices_1.UsersServices();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.login = this.login.bind(this);
    }
    async create(request, response, next) {
        const { name, email, password } = request.body;
        try {
            const newUser = await this.usersServices.create({
                name,
                email,
                password,
            });
            const { password: omitPassword, ...userWithoutPassword } = newUser;
            return response.status(201).json(userWithoutPassword);
        }
        catch (error) {
            next(error);
        }
    }
    async login(request, response, next) {
        const { email, password } = request.body;
        try {
            const { token, userId, userName } = await this.usersServices.login(email, password);
            return response.status(200).json({ token, userId, userName });
        }
        catch (error) {
            next(error);
        }
    }
    async update(request, response, next) {
        const { name, email, oldPassword, newPassword } = request.body;
        try {
            const authenticatedUserId = request.userId;
            const { id } = request.params;
            const updatedUser = await this.usersServices.update(authenticatedUserId, id, {
                name,
                email,
                oldPassword,
                newPassword,
            });
            const { password: omitPassword, ...userWithoutPassword } = updatedUser;
            return response.status(200).json(userWithoutPassword);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(request, response, next) {
        const authenticatedUserId = request.userId;
        const { id } = request.params;
        try {
            await this.usersServices.delete(authenticatedUserId, id);
            return response.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UsersController = UsersController;
