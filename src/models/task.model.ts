import { injectable } from "tsyringe";
import { AppDataSource } from "../database/database";
import { Task } from "../entities/task.entity";

import { CreateTaskDTO } from "../controllers/DTOs/create-task.dto";
import { UpdateTaskDTO } from "../controllers/DTOs/update-task.dto";
import { AppError } from "../shared/error/app-error";
import { ITask } from "./interfaces/task.interface";

@injectable()
export class TaskModel {
  private taskRepository;
  constructor() {
    this.taskRepository = AppDataSource.getRepository(Task);
  }

  async findAll(): Promise<ITask[]> {
    try {
      return await this.taskRepository.find({
        order: { createdAt: "DESC" },
      });
    } catch (error) {
      throw new AppError(
        `Falha ao buscar tarefas no banco de dados - ${error}`
      );
    }
  }

  async createTask(createTask: CreateTaskDTO): Promise<void> {
    try {
      const task = this.taskRepository.create(createTask);
      await this.taskRepository.save(task);
    } catch (error) {
      throw new AppError(`Falha ao criar tarefa no banco de dados - ${error}`);
    }
  }

  async updateTask(id: string, task: UpdateTaskDTO): Promise<void> {
    try {
      const taskAllReadExists = await this.taskRepository.findOne({
        where: { id },
      });

      if (taskAllReadExists) {
        await this.taskRepository.update(id, task);
      } else {
        throw new AppError(`Tarefa não encontrada`);
      }
    } catch (error: any) {
      throw new AppError(
        `Falha ao atualizar tarefa no banco de dados - ${error.message}`
      );
    }
  }

  async findById(id: string): Promise<ITask> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });
      if (task) {
        return task;
      } else {
        throw new AppError(`Tarefa não encontrada`);
      }
    } catch (error: any) {
      throw new AppError(
        `Falha ao buscar tarefa no banco de dados - ${error.message}`
      );
    }
  }

  async changeTaskStatus(id: string, isDone: boolean): Promise<void> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (task) {
        task.isDone = isDone;
        await this.taskRepository.update(id, task);

        await this.taskRepository.save(task);
      } else {
        throw new AppError(`Tarefa não encontrada`);
      }
    } catch (error: any) {
      throw new AppError(
        `Falha ao alterar o status da tarefa no banco de dados - ${error.message}`
      );
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const task = await this.taskRepository.findOneBy({ id });
      if (task) {
        await this.taskRepository.delete(id);
      } else {
        throw new AppError(`Tarefa não encontrada`);
      }
    } catch (error: any) {
      throw new AppError(
        `Falha ao excluir a tarefa no banco de dados - ${error.message}`
      );
    }
  }
}
