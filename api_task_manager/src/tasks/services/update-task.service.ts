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
    const foundTask: boolean = await this.taskRepository.existsBy({ id });
    if (foundTask) {
      this.taskRepository
        .createQueryBuilder()
        .update(Task)
        .set({ description: data.description, taskName: data.taskName })
        .where({ id: id })
        .execute();
    }
  }
}
