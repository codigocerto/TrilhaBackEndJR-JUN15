import { IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'password must have more than 3 characters.' })
  password: string;
}
