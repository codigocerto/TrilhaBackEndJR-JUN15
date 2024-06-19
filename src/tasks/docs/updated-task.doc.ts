import { ApiProperty } from '@nestjs/swagger';
import { CreateTaskDoc } from './create-task.doc';

export class ResponseUpdateTasksDoc extends CreateTaskDoc {
  @ApiProperty({
    type: String,
    description: 'Refers to the task title',
    example: 'task with title updated',
  })
  title: string;
}
