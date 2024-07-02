import { Request, Response } from "express";
import { TaskService } from "../../services/task/TaskService";
import { TaskRequest } from './../../models/interfaces/task/TaskRequest';
import { HttpResponse } from "../../infra/helper/HttpResponse";
import { EditTaskRequest } from "../../models/interfaces/task/EditTaskRequest";



class TaskController {
  constructor(private  taskService: TaskService) {}

  async handle(req: Request, res: Response) {
    const { title, description, userId}: TaskRequest = req.body;

    try {
      const task = await this.taskService.execute({
        title,
        description,
        userId
      })

      return res.json(task)

    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        return HttpResponse.serverError(res);
      }
      return HttpResponse.serverError(res);
    }
  }

  async update(req: Request, res: Response) {
    const { title, description, userId}: EditTaskRequest = req.body;

    try {
      const taskEdited = await this.taskService.update({
        title,
        description,
        userId
      })

      return res.json(taskEdited)

    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        return HttpResponse.serverError(res);
      }
      return HttpResponse.serverError(res);
    }
  }

  async listar(req: Request, res: Response) {
    const userId = req.params.userId as string

    console.log(userId);


    try {
      const tasks = await this.taskService.listTaskById({
        userId
      })

      return res.json(tasks);

    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        return HttpResponse.serverError(res);
      }
      return HttpResponse.serverError(res);
    }
  }

  async delete(req: Request, res: Response) {
    const userId = req.query.userId as string;

    if (!userId) {
      return HttpResponse.badRequest(res, new Error('User ID is required'));
    }

    try {
      const removeTask = await this.taskService.delete({ userId });

      // Verifica se a deleção foi bem-sucedida
      if (removeTask) {
        return HttpResponse.ok(res, { message: 'Task deleted successfully' });
      } else {
        return HttpResponse.badRequest(res, new Error('Task not found or could not be deleted'));
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        return HttpResponse.serverError(res);
      }
      return HttpResponse.serverError(res);
    }
  }
}

export { TaskController }
