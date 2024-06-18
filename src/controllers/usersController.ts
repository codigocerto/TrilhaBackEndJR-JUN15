import { NextFunction, Request, Response } from "express";
import { UsersServices } from "../services/usersServices";
import { User } from "../models/userModel";

class UsersController {
  private usersServices: UsersServices;
  constructor() {
    this.usersServices = new UsersServices();
    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const { name, email, password } = request.body;

    try {
      const result = await this.usersServices.create({ name, email, password });

      return response.status(201).json(result);
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
}

export { UsersController };
