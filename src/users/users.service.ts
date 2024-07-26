import { TokenSchema } from '@/@types';
import { AuthServices } from '@/auth/auth.service';
import { PrismaService } from '@/prisma';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUser, UpdateUser } from './@types';

class UsersServices {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthServices,
  ) {}

  async create(body: CreateUser): Promise<TokenSchema | Error> {
    const { success, error, data } = CreateUser.safeParse(body);

    if (!success) throw new Error(error?.issues[0].message);

    const existUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existUser) throw new Error('This email already exist');

    const passwordHash = await bcrypt.hash(data.password, 10);

    await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
      },
    });

    const { accessToken } = (await this.authService.login({
      email: data.email,
      password: data.password,
    })) as TokenSchema;

    return { accessToken };
  }

  async findAll(): Promise<User[] | null> {
    const users = await this.prisma.user.findMany({
      include: { comments: true, sessions: true, tasks: true, _count: true },
    });

    return users;
  }

  async findById(
    payload: Prisma.UserWhereUniqueInput,
  ): Promise<Omit<User, 'password'> | { Error: string }> {
    const user = await this.prisma.user.findUnique({
      where: payload,
      select: {
        id: true,
        name: true,
        email: true,
        tasks: true,
        comments: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) return { Error: 'User not exist' };

    return user;
  }

  async findOne(
    payload: Prisma.UserWhereUniqueInput,
  ): Promise<Omit<User, 'password'> | { Error: string }> {
    const user = await this.prisma.user.findUnique({
      where: payload,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        tasks: true,
        comments: true,
        sessions: {
          where: { active: true },
          select: { id: true, token: true },
        },
      },
    });

    if (!user) return { Error: 'User not exist' };

    return user;
  }

  async update(
    id: string,
    body: UpdateUser,
  ): Promise<Omit<User, 'password'> | Error> {
    const { success, error, data } = UpdateUser.safeParse(body);

    if (!success) throw new Error(error?.issues[0].message);

    if (!data.password)
      return await this.prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          tasks: true,
          comments: true,
          sessions: {
            where: { active: true },
            select: { id: true, token: true },
          },
        },
      });

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...data, password: passwordHash },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        tasks: true,
        comments: true,
        sessions: {
          where: { active: true },
          select: { id: true, token: true },
        },
      },
    });

    return user;
  }

  async delete(id: string, password: string): Promise<boolean | Error> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error('User not exist');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error('Invalid password');

    await this.prisma.user.delete({ where: { id } });
    return true;
  }
}

export { UsersServices };
