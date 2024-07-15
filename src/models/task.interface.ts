export interface ITask {
  id?: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isDone: boolean;
  userId: string;
}
