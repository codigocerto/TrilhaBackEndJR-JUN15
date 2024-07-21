import { QueryFind } from '@/@types';
import { AuthServices } from '@/auth/auth.service';
import { PrismaService } from '@/prisma';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUser, UpdateUser } from './@types';

class UsersServices {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthServices,
  ) {}

  async create(body: CreateUser): Promise<{ accessToken: string } | Error> {
    const { success, error, data } = CreateUser.safeParse(body);

    if (!success) throw new Error(error?.issues[0].message);

    const passwordHash = await bcrypt.hash(data.password, 10);

    const { password: _, ...user } = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
      },
    });

    const { accessToken } = await this.authService.jwtSessionToken(user.id);

    return { accessToken };
  }

  async findAll(
    queryParams: QueryFind,
  ): Promise<Omit<User, 'password'>[] | null> {
    const { page, take } = queryParams;

    const users = await this.prisma.user.findMany({
      take,
      skip: page * 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        tasks: true,
        Session: { where: { active: true }, select: { id: true, token: true } },
      },
    });

    return users;
  }

  async findOne(id: string): Promise<Omit<User, 'password'> | null> {
    const user = this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        tasks: true,
        Session: { where: { active: true }, select: { id: true, token: true } },
      },
    });

    if (!user) throw new Error('User not exist');

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
          Session: {
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
        Session: { where: { active: true }, select: { id: true, token: true } },
      },
    });

    return user;
  }

  async delete(id: string): Promise<boolean | Error> {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return true;
  }
}

export { UsersServices };
