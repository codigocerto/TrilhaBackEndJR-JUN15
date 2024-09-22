import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { FindAllUserUseCase } from "../../usecases/user/find-all-user.usecase";

export class FindAllUserController {
  constructor() {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const findAllUserUseCase = container.resolve(FindAllUserUseCase);

      const tasks = await findAllUserUseCase.execute();

      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
