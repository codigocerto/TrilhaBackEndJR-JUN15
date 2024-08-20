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
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FindAllTasksService } from 'src/tasks/services/find-all-tasks.service';
import { CreateNewTaskDto } from '../dtos/create-new-task.dto';
import { CreateNewTaskService } from '../services/create-new-task.service';
import { Task } from '../models/task.entity';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { UpdateTaskService } from '../services/update-task.service';
import { DeleteTaskService } from '../services/delete-task.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FindOneTaskService } from '../services/find-one-task.service';

@Controller('/tasks')
export class TasksController {
  constructor(
    private readonly findAllTasksService: FindAllTasksService,
    private readonly findOneTaskService: FindOneTaskService,
    private createNewTaskService: CreateNewTaskService,
    private updateTaskService: UpdateTaskService,
    private deleteTaskService: DeleteTaskService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTasks(@Req() req: Request, @Res() res: Response) {
    const tasksList: Task[] | null = await this.findAllTasksService.findAll();
    return res.status(200).json(tasksList);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return await this.findOneTaskService.findOneTaskById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async createNewTask(@Body() dto: CreateNewTaskDto): Promise<Task> {
    return await this.createNewTaskService.createNewTask(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTask(@Param('id') id: number, @Body() body: UpdateTaskDto) {
    return await this.updateTaskService.updateTask(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(@Param('id') id: number) {
    await this.deleteTaskService.delete(id);
  }
}
