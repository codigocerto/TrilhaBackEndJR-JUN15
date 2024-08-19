import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { FindAllTasksService } from 'src/tasks/services/find-all-tasks.service';
import { CreateNewTaskDto } from '../dtos/create-new-task.dto';
import { CreateNewTaskService } from '../services/create-new-task.service';
import { Task } from '../models/task.entity';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { UpdateTaskService } from '../services/update-task.service';
import { DeleteTaskService } from '../services/delete-task.service';
import { GetTaskDto } from '../dtos/get-task.dto';

@Controller('/tasks')
export class TasksController {
  constructor(
    private readonly findAllTasksService: FindAllTasksService,
    private createNewTaskService: CreateNewTaskService,
    private updateTaskService: UpdateTaskService,
    private deleteTaskService: DeleteTaskService,
  ) {}

  @Get()
  async getAllTasks(@Res() response): Promise<GetTaskDto[]> {
    const tasksList: Task[] | null = await this.findAllTasksService.findAll();
    return response.status(200).json(tasksList);
  }

  @Post()
  @HttpCode(201)
  createNewTask(@Body() dto: CreateNewTaskDto): Promise<Task> {
    return this.createNewTaskService.createNewTask(dto);
  }

  @Put(':id')
  updateTask(@Param('id') id: number, @Body() body: UpdateTaskDto) {
    return this.updateTaskService.updateTask(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(@Param('id') id: number) {
    this.deleteTaskService.delete(id);
  }
}
