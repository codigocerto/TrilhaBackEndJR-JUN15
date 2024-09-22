import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Payload } from "../infra/Auth/Payload";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {

  // Acessar token JWT
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {

    //Validar token
    const { sub }: Payload = verify(token, process.env.JWT_SECRET) as Payload;
    req.user_id = sub

    return next(); //Deixa  que a requisição prossiga, sem barrar.
  } catch (error) {
    return res.status(401).end();
  }

}
