import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../shared/error/app-error";
import { getLogger } from "../../shared/logger/app-logger";
import { UserModel } from "../../models/user.model";
import { IUserResponseDTO } from "../../models/interfaces/user.interface";
import { UserMap } from "../../shared/mapper/user-map";

@injectable()
export class FindAllUserUseCase {
  constructor(
    @inject("UserModel")
    private readonly userModel: UserModel
  ) {}

  async execute(): Promise<IUserResponseDTO[]> {
    const log = getLogger.getChildCategory(FindAllUserUseCase.name);
    try {
      const user = await this.userModel.findAll();
      log.debug(() => `${JSON.stringify(UserMap.toDTO(user))}`);
      return UserMap.toDTO(user);
    } catch (error: any) {
      log.error(() => `${JSON.stringify(error)}`);
      throw new AppError(`${error.message}`);
    }
  }
}
