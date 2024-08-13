import { Injectable } from '@nestjs/common';
import { CreateNewTaskDto } from '../dtos/create-new-task.dto';
import { Repository } from 'typeorm';
import { Task } from '../models/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateNewTaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  createNewTask(data: CreateNewTaskDto): Promise<Task> {
    const newTask = new Task();
    newTask.taskName = data.taskName;
    newTask.description = data.description;
    return this.taskRepository.save(newTask);
  }
}
