import { User } from "../entities/user.entity";

export interface ITask {
  id?: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isDone: boolean;
  user: User;
}
