import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDoc {
  @ApiProperty({
    type: String,
    description: 'The title of the task',
    example: 'Learn NestJS',
    required: true,
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'The description of the task',
    example: 'Remember to learn NestJS',
    required: true,
  })
  description: string;

  @ApiProperty({
    type: String,
    example: '2024-06-18 22:58:08',
    required: true,
  })
  createdAt: string;

  @ApiProperty({
    type: String,
    example: '2024-06-18 22:58:08',
    required: true,
  })
  updatedAt: string;

  @ApiProperty({
    type: String,
    example: null,
    required: true,
  })
  deletedAt: null;
}
