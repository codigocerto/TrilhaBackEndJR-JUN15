import { prisma } from "../database/prisma";
import { User } from "../models/userModel";

class UsersRepository {
  async create({ name, email, password }: User) {
    const result = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return result;
  }

  async findById(id: string) {
    const result = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return result;
  }

  async findByEmail(email: string) {
    const result = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return result;
  }

  async update(id: string, name: string, email: string) {
    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });
    return result;
  }

  async updatePassword(newPassword: string, id: string) {
    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
      },
    });
    return result;
  }

  async delete(id: string) {
    await prisma.task.deleteMany({
      where: {
        userId: id,
      },
    });

    const result = await prisma.user.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export { UsersRepository };
