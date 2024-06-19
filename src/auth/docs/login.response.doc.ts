import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDoc {
  @ApiProperty({
    type: String,
    description: 'A token for user authentication.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJndWlAYmVybmFyZGVzLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNzkyOTM5OCwiZXhwIjoxNzA3OTk0MTk4fQ.oIhj6fWiRWVn8chKTWndVPQqQWmHCAdac705cg5WU5g',
  })
  token: string;
}
