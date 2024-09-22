import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/error/app-error";
import { AuthProvider } from "../shared/auth/auth-provider";
import { jsonWebTokenConfig } from "../config/jwt.config";

interface IPayload {
  id: string;
}

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authProvider = new AuthProvider();

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(`Nenhum token foi informado`, 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { id: userId } = (await authProvider.verify(
      token,
      String(jsonWebTokenConfig.secret)
    )) as IPayload;

    req.user = {
      id: userId,
    };

    next();
  } catch (error) {
    throw new AppError(`Token inválido ou expirado`, 401);
  }
};
