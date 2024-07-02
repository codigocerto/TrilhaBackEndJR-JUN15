import prisma from "../../prisma/index";
import { hash } from "bcryptjs";
import { UserRequest } from "../../models/interfaces/user/UserRequest";
import { RemoveUserRequest } from "../../infra/Auth/RemoveUserRequest";

class UserService {

  async execute({ name, email, password }: UserRequest) {

    if (!email) {
      throw new Error("EMAIL_INCORRECT");
    }

    const userAlreadyExist = await prisma.user.findFirst({
      where: {
        email,
      }
    });

    if (userAlreadyExist) {
      throw new Error("EMAIL_ALREADY_EXIST");
    }

    const passwordHas = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHas
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    return user;
  }

  async findById(user_id: string) {

    if (user_id) {
      const user = await prisma.user.findFirst({
        where: {
          id: user_id
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      })
      return user
    }
  }

  async delete({ user_id }: RemoveUserRequest) {

    if (!user_id) {
      throw new Error('User ID is required');
    }
    try {
      const removedUser = await prisma.user.delete({
        where: {
          id: user_id,
        },
      });

      // Verifica se o usuário foi removido com sucesso
      if (removedUser) {
        return { message: 'User deleted successfully' };
      } else {
        throw new Error('User not found or could not be deleted');
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }

  };
}
export { UserService };
