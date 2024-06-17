import { Task } from "./taskModel";

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserUpdate {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface UserTasks {
  name: string;
  tasks: Task[];
}
