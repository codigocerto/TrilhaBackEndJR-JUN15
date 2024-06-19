import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedLoginDoc {
  @ApiProperty({
    type: String,
    description: 'Wrong email or password.',
    example: 'wrong email or password.',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'Error message',
    example: 'Unauthorized',
  })
  error: string;

  @ApiProperty({
    type: Number,
    description: 'http request status.',
    example: 401,
  })
  statusCode: number;
}
