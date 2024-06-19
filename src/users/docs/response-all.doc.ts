import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class ResponseAllUserkDoc {
  @ApiProperty({
    description: 'Lista de todos os produtos retornados pela API',
    type: [User],
    example: [
      {
        id: 1,
        userName: 'user demo',
        email: 'user@demo2.com',
        profileImg:
          'https://firebasestorage.googleapis.com/v0/b/solutionsdev-a0d06.appspot.com/o/1718745531766-267.jpg?alt=media&token=a496a49b-2059-4b74-8eff-d90d3bb11d3d',
        role: 'user',
        createdAt: '2024-06-18 21:18:54',
        updatedAt: '2024-06-18 21:18:54',
        deletedAt: null,
      },
      {
        id: 2,
        userName: 'user demo 2',
        email: 'user@demo.com',
        profileImg: '',
        role: 'user',
        createdAt: '2024-06-18 23:28:25',
        updatedAt: '2024-06-18 23:28:25',
        deletedAt: null,
      },
    ],
  })
  users: User[];
}
