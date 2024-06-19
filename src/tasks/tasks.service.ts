import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    private userService: UsersService,
  ) {}

  async create(payload: CreateTaskDto, id: number) {
    try {
      const user = await this.userService.findOne(id);
      if (!user) throw new NotFoundException('User not found');

      const task = await this.taskRepository.findOne({
        where: { title: payload.title },
      });
      if (task)
        throw new ConflictException(
          'Task with the same tittle already exists.',
        );
      const newTask = new Task();
      newTask.title = payload.title;
      newTask.description = payload.description;
      newTask.user = user;
      return await this.taskRepository.save(newTask);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.taskRepository.find();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });
      if (!task) throw new NotFoundException('Task not found');
      return task;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.findOne(id);
      if (!task) throw new NotFoundException('Task not found');
      await this.taskRepository.update(id, updateTaskDto);
      const updatedTask = await this.findOne(id);
      return updatedTask;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      const task = await this.findOne(id);
      if (!task) throw new NotFoundException('Task not found');
      await this.taskRepository.softDelete(id);
      return { result: `Task with id ${id} has been remove.` };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
