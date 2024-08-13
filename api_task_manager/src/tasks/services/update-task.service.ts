import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../models/task.entity';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateTaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async updateTask(id: number, data: UpdateTaskDto) {
    const foundTask: Task | null = await this.taskRepository.findOneBy({ id });
    if (foundTask) {
      this.taskRepository.save(data);
    }
  }
}
