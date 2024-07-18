import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { taskRouter } from "./routes/task.routes";
import swaggerUi from "swagger-ui-express";
import "./container";
import { AppError } from "./shared/error/app-error";
import { userRouter } from "./routes/user.routes";
import swaggerOutput from "../swagger_output.json";

export const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.use(taskRouter);
app.use(userRouter);

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
