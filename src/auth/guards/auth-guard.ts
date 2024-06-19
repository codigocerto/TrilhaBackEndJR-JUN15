import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.getTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException("token doesn't exist.");
    }

    try {
      const tokenContent = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });
      req['user'] = tokenContent;
    } catch (error) {
      console.log;
      throw new UnauthorizedException('Invalid token.');
    }
    return true;
  }
  private getTokenFromHeader(request: Request) {
    const headers = request.headers;
    const [type, token] = headers?.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }
}
