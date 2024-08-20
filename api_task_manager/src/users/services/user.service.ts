import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createNewUser(user: User): Promise<User> {
    const checkUser = this.userRepository.existsBy({
      email: user.email,
      name: user.name,
    });

    if (!checkUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ name: username });
  }
}
