import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import { AuthDto } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import {
  fromDtoToEntity,
  fromEntityToDto,
} from 'src/users/mappers/user.mapper';

type SignupData = {
  name: string;
  email: string;
  password: string;
};

type SigninData = {
  userId: number;
  username: string;
};

type AuthResult = {
  accessToken: string;
  userId: number;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupData) {
    const user = await this.userService.createNewUser(fromDtoToEntity(dto));
    return fromEntityToDto(user);
  }

  async validateUser(dto: AuthDto): Promise<AuthResult> {
    const user = await this.userService.findByUsername(dto.username);
    if (!user) return null;

    if (user && dto.password === user.password) {
      const data: SigninData = {
        userId: user.id,
        username: user.name,
      };
      const token = this.jwtService.sign(data);
      return {
        accessToken: token,
        userId: user.id,
        username: user.name,
      };
    }
  }
}
