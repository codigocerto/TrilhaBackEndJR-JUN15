import { plainToClass, plainToInstance } from 'class-transformer';
import { SignupDto } from 'src/auth/dtos/signup.dto';
import { User } from '../models/user.entity';

export function fromDtoToEntity(signupDto: SignupDto) {
  return plainToClass(User, signupDto);
}

export function fromEntityToDto(user: User) {
  return plainToInstance(SignupDto, user, { excludeExtraneousValues: true });
}
