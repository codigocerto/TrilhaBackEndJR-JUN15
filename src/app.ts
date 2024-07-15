import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { taskRouter } from "./routes/task.routes";

import "../src/container";
import { AppError } from "./shared/error/app-error";

export const app = express();

app.use(express.json());

app.use(taskRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: `Internal Server Error - ${error.message}`,
  });
});
