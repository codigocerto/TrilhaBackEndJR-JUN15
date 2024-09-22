import prisma from "../../prisma/index";
import { TaskRequest } from './../../models/interfaces/task/TaskRequest';
import { EditTaskRequest } from './../../models/interfaces/task/EditTaskRequest';
import { ListTaskByUserId } from './../../models/interfaces/task/ListTaskByUserId';
import { RemoveTaskRequest } from './../../models/interfaces/task/RemoveTaskRequest';

class TaskService {

  async execute({ title, description, userId }: TaskRequest) {

    const task = await prisma.task.create({
      data: {
        title: title,
        description: description,
        userId: userId
      },


    });
    return task;
  }

  async update({ title, description, userId }: EditTaskRequest) {
    const dataToUpdate: { title?: string; description?: string } = {};

    if (title !== undefined && title !== '') {
      dataToUpdate.title = title;
    }

    if (description !== undefined && description !== '') {
      dataToUpdate.description = description;
    }

    const taskEdited = await prisma.task.update({
      where: {
        id: userId,
      },
      data: dataToUpdate,
    });

    return taskEdited;
  }

  async listTaskById({ userId }: ListTaskByUserId) {
    const findListTaskById = await prisma.task.findMany({
      where: {
        userId: userId
      }
    })

    return findListTaskById;
  }

  async delete({ userId }: RemoveTaskRequest) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      const removedTask = await prisma.task.delete({
        where: {
          id: userId
        },
      });

      // Verifica se a task foi removida com sucesso.
      if (removedTask) {
        return { message: 'Task deleted successfully' };
      } else {
        throw new Error('Task not found or could not be deleted');
      }
    } catch (error) {
      console.error("Error deleting Task:", error);
      throw error;
    }
  }

}

export { TaskService }
