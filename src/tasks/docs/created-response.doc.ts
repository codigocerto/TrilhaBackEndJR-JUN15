import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user demo' })
  userName: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'user' })
  role: string;

  @ApiProperty({ example: '2024-06-18 20:15:51' })
  createdAt: string;

  @ApiProperty({ example: '2024-06-18 20:15:51' })
  updatedAt: string;

  @ApiProperty({ example: null, nullable: true, type: String })
  deletedAt: string | null;

  @ApiProperty({ type: [Object], example: [] })
  tasks: any[];
}

export class CreatedResponseDoc {
  @ApiProperty({ example: 'Learn NestJS' })
  title: string;

  @ApiProperty({ example: 'Remember to learn NestJS' })
  description: string;

  @ApiProperty({ type: User })
  user: User;

  @ApiProperty({ example: 5 })
  id: number;

  @ApiProperty({ example: '2024-06-18 20:35:29' })
  createdAt: string;

  @ApiProperty({ example: '2024-06-18 20:35:29' })
  updatedAt: string;

  @ApiProperty({ example: null, nullable: true, type: String })
  deletedAt: string | null;
}
