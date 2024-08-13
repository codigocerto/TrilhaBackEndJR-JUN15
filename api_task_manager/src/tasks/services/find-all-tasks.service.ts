import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../models/task.entity';

@Injectable()
export class FindAllTasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRespository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRespository.find();
  }
}
