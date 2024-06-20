import { NextFunction, Request, Response } from "express";
import { UsersServices } from "../services/usersServices";
import { User, UserUpdate } from "../models/userModel";

class UsersController {
  private usersServices: UsersServices;

  constructor() {
    this.usersServices = new UsersServices();
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const { name, email, password } = request.body;

    try {
      const result = await this.usersServices.create({ name, email, password });

      const { password: omitPassword, ...userWithoutPassword } = result;

      return response.status(201).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  }

  async findAll(request: Request, response: Response, next: NextFunction) {
    try {
      const users = await this.usersServices.findAll();

      const usersWithoutPassword = users.map((user: User) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      return response.status(200).json(usersWithoutPassword);
    } catch (error) {
      next(error);
    }
  }

  async findById(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    try {
      const user = await this.usersServices.findById(id);

      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      const { password, ...userWithoutPassword } = user;

      return response.status(200).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const { name, email, oldPassword, newPassword } =
      request.body as UserUpdate;

    try {
      const updatedUser = await this.usersServices.update(id, {
        name,
        email,
        oldPassword,
        newPassword,
      });

      if (!updatedUser) {
        return response.status(404).json({ message: "User not found" });
      }

      const { password: omitPassword, ...userWithoutPassword } = updatedUser;

      return response.status(200).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;

    try {
      await this.usersServices.delete(userId);
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export { UsersController };
