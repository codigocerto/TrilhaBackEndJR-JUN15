import { ApiProperty } from '@nestjs/swagger';

export class UserCreatedResponseDoc {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user demo' })
  userName: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'https://exemplo.com/imagem1.jpg' })
  profileImg: string;

  @ApiProperty({ example: '2024-06-18 20:15:51' })
  createdAt: string;

  @ApiProperty({ example: '2024-06-18 20:15:51' })
  updatedAt: string;

  @ApiProperty({ example: null, nullable: true, type: String })
  deletedAt: string | null;

  @ApiProperty({ type: [Object], example: [] })
  tasks: any[];
}
