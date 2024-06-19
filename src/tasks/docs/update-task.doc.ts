import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDoc {
  @ApiProperty({
    type: String,
    example: 'task with title updated',
  })
  title: string;
}
