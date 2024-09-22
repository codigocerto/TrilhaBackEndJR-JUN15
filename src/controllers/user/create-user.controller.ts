import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateUserDTO } from "../DTOs/create-user.dto";
import { CreateUserUseCase } from "../../usecases/user/create-user.usecase";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const user: CreateUserDTO = req.body;

      const createUserUseCase = container.resolve(CreateUserUseCase);

      await createUserUseCase.execute(user);

      return res.status(201).send();
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
