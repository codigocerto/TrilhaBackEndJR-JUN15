import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDoc {
  @ApiProperty({
    type: String,
    example: 'userName updated',
  })
  userName: string;
}
