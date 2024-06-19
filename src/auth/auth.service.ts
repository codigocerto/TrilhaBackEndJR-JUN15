import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { loginDTO } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async login(PayLoad: loginDTO) {
    try {
      const { email, password } = PayLoad;
      const user = await this.usersRepository.findOne({
        where: { email },
        select: {
          id: true,
          userName: true,
          email: true,
          password: true,
        },
      });

      if (!user) throw new UnauthorizedException('User not found.');

      const VerifyPassword = await bcrypt.compare(password, user.password);

      if (!VerifyPassword)
        throw new UnauthorizedException('wrong email or password.');

      const Token = {
        id: user.id,
        email: user.email,
        userName: user.userName,
      };
      return { token: await this.jwtService.signAsync(Token) };
    } catch (error) {
      console.error('Error occurred:', error);
      throw new HttpException(error.message, error.status);
    }
  }
}
