import { NextFunction, Request, Response } from "express";
import { UsersServices } from "../services/usersServices";
import { UserUpdate } from "../models/userModel";

class UsersController {
  private usersServices: UsersServices;

  constructor() {
    this.usersServices = new UsersServices();
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.login = this.login.bind(this);
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

  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;

    try {
      const token = await this.usersServices.login(email, password);
      return response.status(200).json({ token });
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
    const { id } = request.params;

    try {
      await this.usersServices.delete(id);
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export { UsersController };
