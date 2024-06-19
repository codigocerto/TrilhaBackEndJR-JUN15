import { RoleEnum } from '@/src/enums/role.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  userName: string;

  @IsString({ message: 'O email deve ser uma string' })
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  email: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  password: string;

  @IsEnum(RoleEnum, {
    message: 'O Role do usuário deve ser um dos valores válidos.',
  })
  @IsOptional()
  role: RoleEnum;

  @IsOptional()
  profileImg: string;
}
