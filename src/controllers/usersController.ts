import { NextFunction, Request, Response } from "express";
import { UsersServices } from "../services/usersServices";

class UsersController {
  private usersServices: UsersServices;
  constructor() {
    this.usersServices = new UsersServices();
    this.create = this.create.bind(this);
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
}

export { UsersController };
