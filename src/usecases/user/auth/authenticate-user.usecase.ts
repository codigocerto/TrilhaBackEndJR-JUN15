import { inject, injectable } from "tsyringe";
import { AuthProvider } from "../../../shared/auth/auth-provider";
import { UserModel } from "../../../models/user.model";
import { AppError } from "../../../shared/error/app-error";
import bcrypt from "bcrypt";
import { jsonWebTokenConfig } from "../../../config/jwt.config";

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    private authProvider: AuthProvider,
    @inject("UserModel")
    private userModel: UserModel
  ) {}

  async execute(email: string, password: string) {
    try {
      const user = await this.userModel.findByEmail(email);

      if (!user) {
        throw new AppError("Email ou Senha inválidos");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new AppError("Email ou Senha inválidos");
      }

      const payload = {
        id: user.id,
      };

      const token = await this.authProvider.sign(
        payload,
        String(jsonWebTokenConfig.secret)
      );
      return token;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }
}
