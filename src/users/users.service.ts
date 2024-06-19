import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { FileDTO } from './dto/file.dto';
import { uploadImage } from '../utils/upload.images';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(payload: CreateUserDto, image: FileDTO) {
    let URL = '';
    try {
      if (
        await this.usersRepository.exists({ where: { email: payload.email } })
      ) {
        throw new BadRequestException(
          'There is already a user with this email.',
        );
      }

      if (image) {
        URL = await uploadImage(image);
      }

      const hashedPassword = await bcrypt.hash(payload.password, 8);

      const newUser = this.usersRepository.create({
        ...payload,
        profileImg: URL,
        password: hashedPassword,
      });

      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.log('Error occurred:', error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (error: any) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: { tasks: true },
      });
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error: any) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      if (!user) throw new NotFoundException('User not found');
      await this.usersRepository.update(id, updateUserDto);
      const updatedUser = await this.findOne(id);
      return updatedUser;
    } catch (error: any) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);
      if (user) {
        await this.usersRepository.softDelete(id);
        return { result: `User with id ${id} has been remove.` };
      } else {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async GetInfoUsers(id: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: { tasks: true },
      });
      if (!user) {
        throw new BadGatewayException('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error occurred:', error);
      throw new HttpException(error.message, error.status);
    }
  }
}
