import { TokenSchema } from '@/@types';
import { PrismaService } from '@/prisma';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Login, LoginSchema } from './@types';
import { jwtConstants } from './constants';

class AuthServices {
  constructor(private readonly prisma: PrismaService) {}

  async login(body: LoginSchema): Promise<TokenSchema | Error> {
    const { success, error, data } = Login.safeParse(body);

    if (!success) throw new Error(error?.issues[0].message);

    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      select: { id: true, password: true },
    });
    if (!user || !(await bcrypt.compare(data.password, user.password)))
      return new Error('Invalid email or password');

    const accessToken = await this.jwtSessionToken(user.id);
    return accessToken;
  }

  async jwtSessionToken(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { sessions: true },
    });

    if (!user) throw new Error('User not found');

    await this.prisma.session.updateMany({
      where: {
        user: { id },
        active: true,
      },
      data: {
        active: false,
      },
    });

    const session = await this.prisma.session.create({
      data: {
        userId: user.id,
        token: '',
        active: true,
      },
    });

    const payload = {
      userId: user.id,
      sessionId: session.id,
    };

    const atToken = await this.generateToken({ ...payload, type: 'access' });

    const { token } = await this.prisma.session.update({
      where: { id: session.id },
      data: { token: atToken },
    });

    return { accessToken: token };
  }

  private async generateToken(payload: any): Promise<string> {
    const secret = jwtConstants.secret;
    const expiresIn = jwtConstants.expiresToken;
    const token = jwt.sign({ ...payload }, secret, { expiresIn });
    return token;
  }
}

export { AuthServices };
