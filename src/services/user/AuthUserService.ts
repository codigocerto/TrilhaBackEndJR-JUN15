import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prisma from "../../prisma";
import { AuthRequest } from "../../infra/Auth/AuthRequest";


class AuthUserService {
  async execute({ email, password }: AuthRequest) {

    if (!email) {
      throw new Error("Email precisa ser enviado");
    }

    if (!password) {
      throw new Error("Password precisa ser enviado");
    }

    //Verifica no banco de dados se existe um usuário com email passado
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      }
    });

    if (!user) {
      throw new Error("Nome de usuário ou senha errados!");

    }

    // Verifica se a senha do usuário está correta
    const passwordMatch = await compare(password, user?.password);
    if (!passwordMatch) {
      throw new Error("Senha incorreta");
    }

    const token = sign(
      {
        name: user?.name,
        email: user?.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user?.id,
        expiresIn: "30d"
      }
    );

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      toke: token,
    }

  }
}

export { AuthUserService }
