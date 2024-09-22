import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "../../../usecases/user/auth/authenticate-user.usecase";

export class AuthenticateUserController {
  constructor() {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase
      );

      const token = await authenticateUserUseCase.execute(email, password);

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
