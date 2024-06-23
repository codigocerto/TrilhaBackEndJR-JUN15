import { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/errors";

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (
    error instanceof BadRequestError ||
    error instanceof UnauthorizedError ||
    error instanceof NotFoundError
  ) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  return response.status(500).json({ error: "Internal Server Error" });
};

export { errorHandler };
