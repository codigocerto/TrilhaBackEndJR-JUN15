import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      taskId?: string;
      userId?: string;
    }
  }
}
