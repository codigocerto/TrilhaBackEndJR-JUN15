import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDoc } from './create-user.doc';

export class ResponseUpdateUserDoc extends CreateUserDoc {
  @ApiProperty({
    type: String,
    description: 'Refers to the username',
    example: 'userName updated',
  })
  userName: string;
}
