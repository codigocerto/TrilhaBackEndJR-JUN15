import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDoc {
  @ApiProperty({
    type: String,
    description: 'User name',
    example: 'user demo',
    required: true,
  })
  userName: string;

  @ApiProperty({
    type: String,
    description: 'Reference to the email of the user',
    example: 'user@example.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    example: '123456',
    required: true,
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Profile image url',
    example: 'https://exemplo.com/imagem1.jpg',
    format: 'binary',
  })
  image: string;

  @ApiProperty({
    type: String,
    example: '2024-06-18 22:58:08',
  })
  createdAt: string;

  @ApiProperty({
    type: String,
    example: '2024-06-18 22:58:08',
  })
  updatedAt: string;

  @ApiProperty({
    type: String,
    example: null,
  })
  deletedAt: null;
}
