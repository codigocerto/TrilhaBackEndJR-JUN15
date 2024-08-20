import { Repository } from 'typeorm';
import { Task } from '../models/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FindOneTaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  findOneTaskById(id: number) {
    const task = this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new BadRequestException(`Task with id ${id} not found`);
    }
    return task;
  }
}
