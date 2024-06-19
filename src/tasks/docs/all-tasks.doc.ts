import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';

export class ResponseAllTaskDoc {
  @ApiProperty({
    description: 'Lista de todos os produtos retornados pela API',
    type: [Task],
    example: [
      {
        id: 1,
        title: 'First task',
        description: 'First task',
        createdAt: '2024-05-24T13:40:41.875Z',
        updatedAt: '2024-05-24',
        deletedAt: null,
      },
      {
        id: 2,
        title: 'Second task',
        description: 'Second task',
        createdAt: '2024-05-24T13:36:07.091Z',
        updatedAt: '2024-05-24',
        deletedAt: null,
      },
    ],
  })
  tasks: Task[];
}
