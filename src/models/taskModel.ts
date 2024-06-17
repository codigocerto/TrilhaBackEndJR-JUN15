import { User } from "./userModel";

export interface Task {
  title: string;
  description: string;
  completed: boolean;
  user: User;
}
