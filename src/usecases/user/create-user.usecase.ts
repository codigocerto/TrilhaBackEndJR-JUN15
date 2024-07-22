import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../shared/error/app-error";
import { getLogger } from "../../shared/logger/app-logger";
import { UserModel } from "../../models/user.model";
import { CreateUserDTO } from "../../controllers/DTOs/create-user.dto";
import bcrypt from "bcrypt";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserModel")
    private readonly userModel: UserModel
  ) {}

  async execute(user: CreateUserDTO): Promise<any> {
    const log = getLogger.getChildCategory(CreateUserUseCase.name);
    try {
      const userAllReadyExists = await this.userModel.findByEmail(user.email);

      if (userAllReadyExists) {
        throw new AppError("Email já cadastrado");
      }

      const passwordHash = await bcrypt.hash(user.password, 10);

      await this.userModel.create({
        ...user,
        password: passwordHash,
      });
      log.debug(() => `Usuário criado com sucesso`);
    } catch (error: any) {
      log.error(() => `${JSON.stringify(error)}`);
      throw new AppError(error.message);
    }
  }
}
