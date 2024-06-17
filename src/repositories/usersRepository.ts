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

  async findAll() {
    const result = await prisma.user.findMany({});
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

  update(userId: string, { name, email, password }: User) {
    const result = prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        password,
      },
    });
    return result;
  }

  delete(id: string) {
    const result = prisma.user.delete({
      where: {
        id,
      },
    });
    return result;
  }
}

export { UsersRepository };
