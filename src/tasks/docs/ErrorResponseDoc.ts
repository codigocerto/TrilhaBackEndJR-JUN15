import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDoc {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  message: string;

  @ApiProperty({ example: 'Already exists a task with the same tittle' })
  error: string;
}

export class ErrorResponseFindByIdDoc {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Not Found' })
  message: string;

  @ApiProperty({ example: 'Task not found' })
  error: string;
}

export class ConflictUserResponseDoc {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'There is already a user with this email.' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}

export class ErrorResponseFindByIdUserDoc {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Not Found' })
  message: string;

  @ApiProperty({ example: 'User not found' })
  error: string;
}
