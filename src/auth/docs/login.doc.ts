import { ApiProperty } from '@nestjs/swagger';

export class LoginDoc {
  @ApiProperty({
    type: String,
    description: 'An email for user login.',
    example: 'example@email.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'An password for user login.',
    example: '12345',
    required: true,
  })
  password: string;
}
