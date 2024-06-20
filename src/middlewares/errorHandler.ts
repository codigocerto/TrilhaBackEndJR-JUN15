import { NextFunction, Request, Response } from "express";

function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.error("Error:", error.message);

  let statusCode = 500;
  if (error instanceof Error) {
    switch (error.message) {
      case "User exists":
        statusCode = 400;
        break;
      case "User not found":
        statusCode = 404;
        break;
      case "Password invalid.":
        statusCode = 401;
        break;
      default:
        statusCode = 500;
        break;
    }
  }

  return response.status(statusCode).json({ error: error.message });
}

export { errorHandler };
