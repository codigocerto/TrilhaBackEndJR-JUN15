import { Task } from "./taskModel";

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserTasks {
  name: string;
  tasks: Task[];
}
