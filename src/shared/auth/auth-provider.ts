import { sign, verify } from "jsonwebtoken";
import { jsonWebTokenConfig } from "../../config/jwt.config";

export class AuthProvider {
  async sign(payload: any, secret: string): Promise<any> {
    try {
      const token = sign(payload, secret, {
        expiresIn: jsonWebTokenConfig.experisIn,
      });

      return token;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async verify(token: string, secret: string) {
    try {
      return verify(token, secret);
    } catch (error) {
      throw new Error("Token inválido");
    }
  }
}
